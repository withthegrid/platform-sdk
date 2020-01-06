import Joi from '@hapi/joi';

import Comms from './comms';
import Routes, * as IndividualRoutes from './routes';

import * as models from './models';
import * as routes from './routes/routes';

import { Response as MachineLoginResponse } from './routes/authentication/machine-login';


class PlatformSdk {
  protected comms: Comms;

  routes: Routes;

  constructor(baseURL = 'https://api.withthegrid.com', RoutesClass: typeof Routes = Routes) {
    this.comms = new Comms(baseURL, PlatformSdk.apiVersion);
    this.routes = new RoutesClass(this.comms);
  }

  async machineLogin(assertion: string): Promise<MachineLoginResponse> {
    const result = this.routes.authentication.machineLogin({ body: { assertion } });
    const response = await result.response;
    this.comms.login(response.jwt, response.environment?.hashId);
    return response;
  }

  changeEnvironment(environmentHashId?: string): void {
    this.comms.changeEnvironment(environmentHashId);
  }

  resumeSession(jwt: string, environmentHashId?: string): void {
    this.comms.login(jwt, environmentHashId);
  }

  logout(): void {
    this.comms.logout();
  }

  get headers(): object {
    return JSON.parse(JSON.stringify(this.comms.axios.defaults.headers.common));
  }

  static get apiVersion(): number {
    return 2;
  }
}

export default PlatformSdk;

export { ControllerGeneratorOptions } from './comms/controller';
export { default as TableController, TableQuery, EffectiveTableQuery } from './comms/table-controller';
export { default as Comms } from './comms';
export { default as controllerGenerator, Result } from './comms/controller';

export { default as instances } from './instances';
export { default as errors } from './errors';

export {
  routes,
  models,
  Routes,
  IndividualRoutes,
  Joi,
};
