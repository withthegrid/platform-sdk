import Joi from '@hapi/joi';

import Comms from './comms';
import Routes, * as IndividualRoutes from './routes';

import * as models from './models';
import * as routes from './routes/routes';

import { Response as MachineLoginResponse } from './routes/authentication/machine-login';

const apiVersion = 2;

class PlatformSdk {
  protected comms: Comms;

  routes: Routes;

  constructor(baseURL = 'https://api.withthegrid.com', initRoutes = true) {
    this.comms = new Comms(baseURL, PlatformSdk.apiVersion);
    if (initRoutes) {
      this.routes = new Routes(this.comms);
    }
  }

  async machineLogin(assertion: string): Promise<MachineLoginResponse> {
    const result = this.routes.authentication.machineLogin({ body: { assertion } });
    const response = await result.response;
    this.comms.login(response.jwt, response.environment?.hashId);
    return response;
  }


  get environment(): { type: string; hashId: string } | undefined {
    return this.comms.environment;
  }

  changeEnvironment(environmentHashId?: string, type = 'environment'): void {
    this.comms.changeEnvironment(environmentHashId, type);
  }

  resumeSession(jwt: string, environmentHashId?: string, type = 'environment'): void {
    this.comms.login(jwt, environmentHashId, type);
  }

  logout(): void {
    this.comms.logout();
  }

  get headers(): object {
    return JSON.parse(JSON.stringify(this.comms.axios.defaults.headers.common));
  }

  static get apiVersion(): number {
    return apiVersion;
  }
}

export default PlatformSdk;

export { ControllerGeneratorOptions } from './comms/controller';
export { default as TableController, TableQuery, EffectiveTableQuery } from './comms/table-controller';
export { default as Comms } from './comms';
export { default as controllerGenerator, Result } from './comms/controller';

export { default as errors } from './errors';

export {
  routes,
  models,
  Routes,
  IndividualRoutes,
  Joi,
  apiVersion,
};
