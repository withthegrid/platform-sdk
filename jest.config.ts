import type { Config } from '@jest/types';
// Sync object
const config: Config.InitialOptions = {
  verbose: true,
  testMatch: ['**/test/**/*test.ts'],
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
};
export default config;
