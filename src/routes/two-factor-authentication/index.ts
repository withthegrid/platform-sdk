import * as enable from './enable';
import * as disable from './disable';
import * as getKeyuri from './get-keyuri';

import Comms from '../../comms';
import controllerGenerator, { Result } from '../../comms/controller';

class TwoFactorAuthenticationRoute {
  static routerPath = 'two-factor-authentication';

  static authenticated = true;

  constructor(readonly comms: Comms) {
  }

  enable = (parameters: enable.Request):
    Result<
      enable.EffectiveRequest,
      enable.Response
    > => controllerGenerator<
      enable.Request,
      enable.EffectiveRequest,
      enable.Response
    >(
      enable.controllerGeneratorOptions,
      TwoFactorAuthenticationRoute.routerPath,
      TwoFactorAuthenticationRoute.authenticated,
      this.comms,
    )(parameters);

  disable = (parameters: disable.Request):
    Result<
      disable.EffectiveRequest,
      disable.Response
    > => controllerGenerator<
      disable.Request,
      disable.EffectiveRequest,
      disable.Response
    >(
      disable.controllerGeneratorOptions,
      TwoFactorAuthenticationRoute.routerPath,
      TwoFactorAuthenticationRoute.authenticated,
      this.comms,
    )(parameters);

  getKeyuri = (parameters: getKeyuri.Request):
    Result<
      getKeyuri.EffectiveRequest,
      getKeyuri.Response
    > => controllerGenerator<
      getKeyuri.Request,
      getKeyuri.EffectiveRequest,
      getKeyuri.Response
    >(
      getKeyuri.controllerGeneratorOptions,
      TwoFactorAuthenticationRoute.routerPath,
      TwoFactorAuthenticationRoute.authenticated,
      this.comms,
    )(parameters);
}

export default TwoFactorAuthenticationRoute;
