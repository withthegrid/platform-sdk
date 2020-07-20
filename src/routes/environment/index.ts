import * as add from './add';
import * as deleteRoute from './delete';
import * as find from './find';
import * as get from './get';
import * as update from './update';

import Comms from '../../comms';
import controllerGenerator, { Result } from '../../comms/controller';
import TableController from '../../comms/table-controller';

class EnvironmentRoute {
  static routerPath = 'environment';

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
      EnvironmentRoute.routerPath,
      EnvironmentRoute.auth,
      this.comms,
    )(parameters);

  delete = (parameters: deleteRoute.Request):
    Result<deleteRoute.EffectiveRequest, deleteRoute.Response> => controllerGenerator<
      deleteRoute.Request,
      deleteRoute.EffectiveRequest,
      deleteRoute.Response
    >(
      deleteRoute.controllerGeneratorOptions,
      EnvironmentRoute.routerPath,
      EnvironmentRoute.auth,
      this.comms,
    )(parameters);

  find = (parameters: find.Request):
    Result<find.EffectiveRequest, find.Response> => controllerGenerator<
      find.Request,
      find.EffectiveRequest,
      find.Response
    >(
      find.controllerGeneratorOptions,
      EnvironmentRoute.routerPath,
      EnvironmentRoute.auth,
      this.comms,
    )(parameters);

  findTableController = (parameters: find.Query):
    TableController<find.ResponseRow> => new TableController<find.ResponseRow>(
      this.find,
      (row: find.ResponseRow, sortBy: string) => {
        let lastValueSortColumn;
        if (sortBy === 'name') {
          lastValueSortColumn = row.environment.name;
        } else {
          lastValueSortColumn = row.environment.hashId;
        }
        return {
          lastValueSortColumn,
          lastValueHashId: row.environment.hashId,
        };
      },
      parameters,
    );

  get = (parameters: get.Request):
    Result<get.EffectiveRequest, get.Response> => controllerGenerator<
      get.Request,
      get.EffectiveRequest,
      get.Response
    >(
      get.controllerGeneratorOptions,
      EnvironmentRoute.routerPath,
      EnvironmentRoute.auth,
      this.comms,
    )(parameters);

  update = (parameters: update.Request):
    Result<update.EffectiveRequest, update.Response> => controllerGenerator<
      update.Request,
      update.EffectiveRequest,
      update.Response
    >(
      update.controllerGeneratorOptions,
      EnvironmentRoute.routerPath,
      EnvironmentRoute.auth,
      this.comms,
    )(parameters);
}

export default EnvironmentRoute;
