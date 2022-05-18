import * as validatePassword from './validate-password';
import * as validateCode from './validate-code';
import * as removeSecret from './remove-secret';
import * as getQRCode from './get-qr-code';
import * as getSettings from './get-settings';
import * as validatePasswordLogin from './validate-password-login';
import * as validateCodeLogin from './validate-code-login';

import Comms from '../../comms';

import controllerGenerator, { Result } from '../../comms/controller';

class TwoFactorAuthenticationRoute {
  static routerPath = 'two-factor-authentication';

  static authenticated = true;
  static unauthenticated = false;

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

  getQRCode = (parameters: getQRCode.Request):
    Result<
      getQRCode.EffectiveRequest,
      getQRCode.Response
    > => controllerGenerator<
      getQRCode.Request,
      getQRCode.EffectiveRequest,
      getQRCode.Response
    >(
      getQRCode.controllerGeneratorOptions,
      TwoFactorAuthenticationRoute.routerPath,
      TwoFactorAuthenticationRoute.authenticated,
      this.comms,
    )(parameters);

  getSettings = (parameters: getSettings.Request):
    Result<
      getSettings.EffectiveRequest,
      getSettings.Response
    > => controllerGenerator<
      getSettings.Request,
      getSettings.EffectiveRequest,
      getSettings.Response
    >(
      getSettings.controllerGeneratorOptions,
      TwoFactorAuthenticationRoute.routerPath,
      TwoFactorAuthenticationRoute.authenticated,
      this.comms,
    )(parameters);

  validatePasswordLogin = (parameters: validatePasswordLogin.Request):
    Result<
      validatePasswordLogin.EffectiveRequest,
      validatePasswordLogin.Response
    > => controllerGenerator<
      validatePasswordLogin.Request,
      validatePasswordLogin.EffectiveRequest,
      validatePasswordLogin.Response
    >(
      validatePasswordLogin.controllerGeneratorOptions,
      TwoFactorAuthenticationRoute.routerPath,
      TwoFactorAuthenticationRoute.unauthenticated,
      this.comms,
    )(parameters);

  validateCodeLogin = (parameters: validateCodeLogin.Request):
    Result<
      validateCodeLogin.EffectiveRequest,
      validateCodeLogin.Response
    > => controllerGenerator<
      validateCodeLogin.Request,
      validateCodeLogin.EffectiveRequest,
      validateCodeLogin.Response
    >(
      validateCodeLogin.controllerGeneratorOptions,
      TwoFactorAuthenticationRoute.routerPath,
      TwoFactorAuthenticationRoute.unauthenticated,
      this.comms,
    )(parameters);
}

export default TwoFactorAuthenticationRoute;
