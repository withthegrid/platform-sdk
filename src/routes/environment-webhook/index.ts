import * as get from './get';

import Comms from '../../comms';
import controllerGenerator, { Result } from '../../comms/controller';

class EnvironmentWebhookRoute {
  static routerPath = 'environment-webhook';

  static auth = true;

  constructor(readonly comms: Comms) {
  }

  get = (parameters: get.Request):
    Result<get.EffectiveRequest, get.Response> => controllerGenerator<
      get.Request,
      get.EffectiveRequest,
      get.Response
    >(
      get.controllerGeneratorOptions,
      EnvironmentWebhookRoute.routerPath,
      EnvironmentWebhookRoute.auth,
      this.comms,
    )(parameters);
}

export default EnvironmentWebhookRoute;
