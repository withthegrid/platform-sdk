import * as find from './find';

import Comms from '../../comms';
import controllerGenerator, { Result } from '../../comms/controller';
import TableController from '../../comms/table-controller';

class AnalyticsRoute {
  static routerPath = 'analytics';

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
      AnalyticsRoute.routerPath,
      AnalyticsRoute.auth,
      this.comms,
    )(parameters);

  findTableController = (parameters: find.Query):
    TableController<find.ResponseRow> => new TableController<find.ResponseRow>(
      this.find,
      undefined,
      parameters,
    );
}

export default AnalyticsRoute;
