import * as add from './add';
import * as deleteRoute from './delete';
import * as deleteMulti from './deleteMulti';
import * as find from './find';
import * as get from './get';

import Comms from '../../comms';
import controllerGenerator, { Result } from '../../comms/controller';
import TableController from '../../comms/table-controller';

class CommandRoute {
  static routerPath = 'command';

  static auth = true;

  constructor(readonly comms: Comms) {
  }

  add = (parameters: add.Request):
    Result<add.EffectiveRequest, add.Response> => controllerGenerator<
      add.Request,
      add.EffectiveRequest,
      add.Response
    >(
      add.controllerGeneratorOptions,
      CommandRoute.routerPath,
      CommandRoute.auth,
      this.comms,
    )(parameters);

  delete = (parameters: deleteRoute.Request):
    Result<deleteRoute.EffectiveRequest, deleteRoute.Response> => controllerGenerator<
      deleteRoute.Request,
      deleteRoute.EffectiveRequest,
      deleteRoute.Response
    >(
      deleteRoute.controllerGeneratorOptions,
      CommandRoute.routerPath,
      CommandRoute.auth,
      this.comms,
    )(parameters);

  deleteMulti = (parameters: deleteMulti.Request):
    Result<deleteMulti.EffectiveRequest, deleteMulti.Response> => controllerGenerator<
      deleteMulti.Request,
      deleteMulti.EffectiveRequest,
      deleteMulti.Response
    >(
      deleteMulti.controllerGeneratorOptions,
      CommandRoute.routerPath,
      CommandRoute.auth,
      this.comms,
    )(parameters);

  find = (parameters?: find.Request):
    Result<find.EffectiveRequest, find.Response> => controllerGenerator<
      find.Request,
      find.EffectiveRequest,
      find.Response
    >(
      find.controllerGeneratorOptions,
      CommandRoute.routerPath,
      CommandRoute.auth,
      this.comms,
    )(parameters);

  findTableController = (parameters?: find.Query):
    TableController<find.ResponseRow> => new TableController<find.ResponseRow>(
      this.find,
      parameters,
    );

  get = (parameters: get.Request):
    Result<get.EffectiveRequest, get.Response> => controllerGenerator<
      get.Request,
      get.EffectiveRequest,
      get.Response
    >(
      get.controllerGeneratorOptions,
      CommandRoute.routerPath,
      CommandRoute.auth,
      this.comms,
    )(parameters);
}

export default CommandRoute;
