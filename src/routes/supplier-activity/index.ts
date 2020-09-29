import * as find from './find';
import * as get from './get';

import Comms from '../../comms';
import controllerGenerator, { Result } from '../../comms/controller';
import TableController from '../../comms/table-controller';

class SupplierActivityRoute {
  static routerPath = 'supplier-activity';

  static auth = true;

  constructor(readonly comms: Comms) {
  }

  find = (parameters?: find.Request):
    Result<find.EffectiveRequest, find.Response> => controllerGenerator<
      find.Request,
      find.EffectiveRequest,
      find.Response
    >(
      find.controllerGeneratorOptions,
      SupplierActivityRoute.routerPath,
      SupplierActivityRoute.auth,
      this.comms,
    )(parameters);

  findTableController = (parameters?: find.Query):
    TableController<find.ResponseRow> => new TableController<find.ResponseRow>(
      this.find,
      (row: find.ResponseRow) => ({
        lastValueSortColumn: row.activity.createdAt,
        lastValueHashId: row.activity.hashId,
      }),
      parameters,
    );

  get = (parameters: get.Request):
    Result<get.EffectiveRequest, get.Response> => controllerGenerator<
      get.Request,
      get.EffectiveRequest,
      get.Response
    >(
      get.controllerGeneratorOptions,
      SupplierActivityRoute.routerPath,
      SupplierActivityRoute.auth,
      this.comms,
    )(parameters);
}

export default SupplierActivityRoute;
