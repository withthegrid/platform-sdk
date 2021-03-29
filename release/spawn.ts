import path from 'path';
import { spawn } from 'child_process';

const rootPath = path.resolve(__dirname, '../');

let activeSpawns = 0;

function localSpawn(cmd: string, params: string[], cwd = rootPath): Promise<string> {
  return new Promise((resolve, reject) => {
    let cwdRemark = '';
    if (cwd !== rootPath) {
      cwdRemark = ` (at ${cwd})`;
    }

    console.log(`local: ${cmd} ${params.join(' ')}${cwdRemark}`);

    let stdOut = '';
    let stdErr = '';

    activeSpawns += 1;
    const spawnedProcess = spawn(cmd, params, { cwd });

    spawnedProcess.on('error', (e) => {
      reject(e);
    });

    if (spawnedProcess.stdout === null || spawnedProcess.stderr === null) {
      activeSpawns -= 1;
      reject(new Error('Spawned process does not have stdout or stderr'));
      return;
    }

    spawnedProcess.stdout.on('data', (data: Buffer) => {
      stdOut += data.toString('utf-8');
    });

    spawnedProcess.stderr.on('data', (data: Buffer) => {
      stdErr += data.toString('utf-8');
    });

    spawnedProcess.on('exit', (code) => {
      activeSpawns -= 1;

      if (code === 0) {
        resolve(stdOut);
        return;
      }
      console.log('stdout:');
      console.log(stdOut);
      console.log('stderr:');
      console.log(stdErr);
      reject(new Error(`Exited with code ${code}`));
    });
  });
}

function inactive(): Promise<void> {
  return new Promise((resolve) => {
    const intervalId = setInterval(() => {
      if (activeSpawns === 0) {
        resolve();
        clearInterval(intervalId);
      }
    }, 100);
  });
}

export { localSpawn, inactive };
