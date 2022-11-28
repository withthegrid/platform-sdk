import * as find from './find';

import Comms from '../../comms';
import controllerGenerator, { Result } from '../../comms/controller';
import TableController from '../../comms/table-controller';

class QuantityRoute {
  static routerPath = 'measurement';

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
      QuantityRoute.routerPath,
      QuantityRoute.auth,
      this.comms,
    )(parameters);

  findTableController = (parameters: find.Query):
    TableController<find.ResponseRow> => new TableController<find.ResponseRow>(
      this.find,
      parameters,
    );
}

export default QuantityRoute;
