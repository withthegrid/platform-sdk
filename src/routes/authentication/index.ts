import * as machineLogin from './machine-login';

import Comms from '../../comms';
import controllerGenerator, { Result } from '../../comms/controller';

class AuthenticationRoute {
  static routerPath = 'authentication';

  static auth = false;

  constructor(readonly comms: Comms) {
  }

  machineLogin = (parameters: machineLogin.Request):
    Result<machineLogin.EffectiveRequest, machineLogin.Response> => controllerGenerator<
      machineLogin.Request,
      machineLogin.EffectiveRequest,
      machineLogin.Response
    >(
      machineLogin.controllerGeneratorOptions,
      AuthenticationRoute.routerPath,
      AuthenticationRoute.auth,
      this.comms,
    )(parameters);
}

export default AuthenticationRoute;
