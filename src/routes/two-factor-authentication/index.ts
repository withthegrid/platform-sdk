import * as enable from './enable';
import * as disableSecret from './disable-secret';
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

  disableSecret = (parameters: disableSecret.Request):
    Result<
      disableSecret.EffectiveRequest,
      disableSecret.Response
    > => controllerGenerator<
      disableSecret.Request,
      disableSecret.EffectiveRequest,
      disableSecret.Response
    >(
      disableSecret.controllerGeneratorOptions,
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
