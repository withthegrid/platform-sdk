import * as validatePassword from './validate-password';
import * as validateGoogleAuthenticatorCode from './validate-google-authenticator-code';
import * as removeSecret from './remove-secret';
import * as getQRCode from './get-qr-code';
import * as getSettings from './get-settings';

import Comms from '../../comms';

import controllerGenerator, { Result } from '../../comms/controller';

class TwoFactorAuthenticationRoute {
  static routerPath = 'two-factor-authentication';

  static auth = false;

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
      TwoFactorAuthenticationRoute.auth,
      this.comms,
    )(parameters);

  validateGoogleAuthenticatorCode = (parameters: validateGoogleAuthenticatorCode.Request):
    Result<
      validateGoogleAuthenticatorCode.EffectiveRequest,
      validateGoogleAuthenticatorCode.Response
    > => controllerGenerator<
      validateGoogleAuthenticatorCode.Request,
      validateGoogleAuthenticatorCode.EffectiveRequest,
      validateGoogleAuthenticatorCode.Response
    >(
      validateGoogleAuthenticatorCode.controllerGeneratorOptions,
      TwoFactorAuthenticationRoute.routerPath,
      TwoFactorAuthenticationRoute.auth,
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
      true,
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
      true,
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
      true,
      this.comms,
    )(parameters);
}

export default TwoFactorAuthenticationRoute;
