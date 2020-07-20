import * as find from './find';
import Comms from '../../comms';
import controllerGenerator, { Result } from '../../comms/controller';

class AutocompleteRoute {
  static routerPath = 'autocomplete';

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
      AutocompleteRoute.routerPath,
      AutocompleteRoute.auth,
      this.comms,
    )(parameters);
}

export default AutocompleteRoute;
