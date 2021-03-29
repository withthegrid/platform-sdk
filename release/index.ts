import semanticRelease from 'semantic-release';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { localSpawn } from './spawn';

import notifyOnGoogleChat from './google-chat';
import getNpmTag from './get-npm-tag';

async function go() {
  const result = await semanticRelease({
    branches: [
      { name: 'main', channel: 'main' },
      { name: 'next', channel: 'next' },
    ],
    plugins: [
      [
        '@semantic-release/commit-analyzer',
        {
          releaseRules: [
            { type: 'perf', release: 'patch' },
            { type: 'revert', release: 'patch' },
            { type: 'docs', release: 'patch' },
            { type: 'chore', release: false },
            { type: 'refactor', release: 'patch' },
            { type: 'test', release: 'patch' },
            { type: 'build', release: 'patch' },
            { type: 'ci', release: 'patch' },
          ],
        },
      ],
      '@semantic-release/release-notes-generator',
      '@semantic-release/changelog',
      [
        '@semantic-release/npm',
        {
          npmPublish: false,
        },
      ],
      '@semantic-release/git',
      '@semantic-release/github',
    ],
    preset: 'conventionalcommits',
    presetConfig: {
      /**
       * Types from the Conventional Changelog conventionalcommits.org convention.
       * The types are used as they were in version 4.5.0, of which the link to
       * the exact location is shown below. The only change to the types array is
       * whether some types are hidden or not.
       *
       * https://github.com/conventional-changelog/conventional-changelog/blob/conventional-changelog-conventionalcommits%404.5.0/packages/conventional-changelog-conventionalcommits/writer-opts.js#L169
       */
      types: [
        { type: 'feat', section: 'Features' },
        { type: 'fix', section: 'Bug Fixes' },
        { type: 'perf', section: 'Performance Improvements' },
        { type: 'revert', section: 'Reverts' },
        { type: 'docs', section: 'Documentation' },
        { type: 'style', section: 'Styles' },
        { type: 'chore', section: 'Miscellaneous Chores', hidden: true },
        { type: 'refactor', section: 'Code Refactoring' },
        { type: 'test', section: 'Tests' },
        { type: 'build', section: 'Build System' },
        { type: 'ci', section: 'Continuous Integration' },
      ],
    },
  });

  if (result !== false) {
    const branch = (await localSpawn('git', ['branch', '--show-current'])).trim();
    const npmTag = await getNpmTag(branch);

    // create .npmrc file with tokens
    const npmrcPath = path.resolve(process.cwd(), '.npmrc');
    const npmRcLines = [
      // see https://docs.npmjs.com/using-private-packages-in-a-ci-cd-workflow
      // eslint-disable-next-line no-template-curly-in-string
      '//registry.npmjs.org/:_authToken=${NPM_TOKEN}',
      // eslint-disable-next-line no-template-curly-in-string
      '//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}',
    ];
    if (fs.existsSync(npmrcPath)) {
      const curContents: string = fs.readFileSync(npmrcPath, 'utf8');
      npmRcLines.push(...curContents.split(os.EOL));
    }

    fs.writeFileSync(npmrcPath, npmRcLines.join(os.EOL), { flag: 'w' });

    // await localSpawn('npm', ['publish', '--tag', npmTag]);
    await localSpawn('npm', ['publish', '--@withthegrid:registry=https://npm.pkg.github.com']);

    if (process.env.GOOGLE_CHAT_WEBHOOK !== undefined) {
      const repoUrl = `https://github.com/withthegrid/platform-sdk/releases/${result.nextRelease.gitTag}`;

      const targetTexts = [
        `<https://www.npmjs.com/package/@withthegrid/platform-sdk/v/${result.nextRelease.version}|NPM package registry (tag=${npmTag})>`,
        `<https://github.com/withthegrid/platform-sdk/packages/115659?version=${result.nextRelease.version}|GitHub package registry>`,
      ];
      const lines: string[] = [
        `SDK release <${repoUrl}|${result.nextRelease.gitTag}> created on _${branch}_ branch.`,
        `Deployed to ${targetTexts.join(' and ')}.`,
      ];
      lines.push('', 'Commits:');
      result.commits.forEach((c) => lines.push(`- ${c.subject}`));

      await notifyOnGoogleChat(
        process.env.GOOGLE_CHAT_WEBHOOK,
        lines.join('\n'),
      );
    }
  } else {
    console.log('No release published.');
  }
}

go()
  .then(() => {
    process.exit(0);
  })
  .catch((e) => {
    console.error(e.stack);
    process.exit(1);
  });
