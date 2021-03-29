import { localSpawn } from './spawn';

async function getNpmTag(branch: string): Promise<string> {
  if (branch === 'main') {
    return 'latest';
  }

  let nextAheadOfMain: number | undefined;
  let nextBehindMain: number | undefined;
  try {
    const diffOutput = await localSpawn('git', ['rev-list', '--left-right', '--count', 'next...main']);
    [nextAheadOfMain, nextBehindMain] = diffOutput.trim().split('\t').map((n) => parseInt(n, 10));
  } catch (e) {
    console.log(`Could not find commit difference between the two branches, probably one of them does not exist: ${e.message}`);
    return 'latest';
  }

  if (branch === 'next') {
    if (nextAheadOfMain !== undefined && nextAheadOfMain > 0) {
      console.log(`Next is ${nextAheadOfMain} commits ahead and ${nextBehindMain} commits behind main, so tagging as sandbox in npm`);
      return 'sandbox';
    }
    return 'latest';
  }

  throw new Error(`Branch ${branch} not recognized`);
}

export default getNpmTag;
