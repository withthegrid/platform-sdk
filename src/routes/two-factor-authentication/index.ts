import * as validatePassword from './validate-password';
import * as validateCode from './validate-code';
import * as removeSecret from './remove-secret';
import * as getKeyuri from './get-keyuri';

import Comms from '../../comms';
import controllerGenerator, { Result } from '../../comms/controller';

class TwoFactorAuthenticationRoute {
  static routerPath = 'two-factor-authentication';

  static authenticated = true;

  constructor(readonly comms: Comms) {
  }

  validatePassword = (parameters: validatePassword.Request):
    Result<
      validatePassword.EffectiveRequest,
      validatePassword.Response
    > => controllerGenerator<
      validatePassword.Request,
      validatePassword.EffectiveRequest,
      validatePassword.Response
    >(
      validatePassword.controllerGeneratorOptions,
      TwoFactorAuthenticationRoute.routerPath,
      TwoFactorAuthenticationRoute.authenticated,
      this.comms,
    )(parameters);

  validateCode = (parameters: validateCode.Request):
    Result<
      validateCode.EffectiveRequest,
      validateCode.Response
    > => controllerGenerator<
      validateCode.Request,
      validateCode.EffectiveRequest,
      validateCode.Response
    >(
      validateCode.controllerGeneratorOptions,
      TwoFactorAuthenticationRoute.routerPath,
      TwoFactorAuthenticationRoute.authenticated,
      this.comms,
    )(parameters);

  removeSecret = (parameters: removeSecret.Request):
    Result<
      removeSecret.EffectiveRequest,
      removeSecret.Response
    > => controllerGenerator<
      removeSecret.Request,
      removeSecret.EffectiveRequest,
      removeSecret.Response
    >(
      removeSecret.controllerGeneratorOptions,
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
