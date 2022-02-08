import * as find from './find';

import Comms from '../../comms';
import controllerGenerator, { Result } from '../../comms/controller';

class SuggestionsRoute {
  static routerPath = 'suggestions';

  static auth = true;

  constructor(readonly comms: Comms) {
  }

  find = (parameters: find.Request):
    Result<find.EffectiveRequest, find.Response> => controllerGenerator<
    find.Request,
    find.EffectiveRequest,
    find.Response
    >(
      find.controllerGeneratorOptions,
      SuggestionsRoute.routerPath,
      SuggestionsRoute.auth,
      this.comms,
    )(parameters);
}

export default SuggestionsRoute;
