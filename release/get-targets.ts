import { localSpawn } from './spawn';

async function getTargets(branch: string, versionTag: string): Promise<string[]> {
  let nextAheadOfMain: number | undefined;
  let nextBehindMain: number | undefined;
  try {
    const diffOutput = await localSpawn('git', ['rev-list', '--left-right', '--count', 'next...main']);
    [nextAheadOfMain, nextBehindMain] = diffOutput.trim().split('\t').map((n) => parseInt(n, 10));
  } catch (e) {
    console.log(`Could not find commit difference between the two branches, probably one of them does not exist: ${e.message}`);
  }

  const targets: string[] = [];
  if (branch === 'main') {
    targets.push('production');
    if (nextAheadOfMain === 0 && (nextBehindMain === undefined || nextBehindMain > 0)) {
      console.log(`Creating a deploy for version ${versionTag} to sandbox`);
      targets.push('sandbox');
    } else {
      console.log(`Next is ${nextAheadOfMain} commits ahead and ${nextBehindMain} commits behind main, so not deploying to sandbox`);
    }
  } else if (branch === 'next') {
    if (nextAheadOfMain !== undefined && nextAheadOfMain > 0) {
      console.log(`Creating a deploy for version ${versionTag} to sandbox`);
      targets.push('sandbox');
    } else {
      console.log(`Next is ${nextAheadOfMain} commits ahead and ${nextBehindMain} commits behind main, so not deploying to sandbox from next`);
    }
  } else {
    throw new Error(`Branch ${branch} not recognized`);
  }

  return targets;
}

export default getTargets;
