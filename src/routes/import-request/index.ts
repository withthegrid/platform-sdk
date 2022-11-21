import Comms from '../../comms';
import controllerGenerator, { Result } from '../../comms/controller';
import TableController from '../../comms/table-controller';

import * as generateTemplate from './generate-template';
import * as add from './add';
import * as get from './get';
import * as deleteRoute from './delete';
import * as find from './find';

export default class ImportRequestRoute {
  static routerPath = 'import';
  static auth = true;

  constructor(readonly comms: Comms) {
  }

  generateTemplate = (parameters: generateTemplate.Request):
    Result<generateTemplate.EffectiveRequest, generateTemplate.Response> => controllerGenerator<
      generateTemplate.Request,
      generateTemplate.EffectiveRequest,
      generateTemplate.Response
    >(
      generateTemplate.controllerGeneratorOptions,
      ImportRequestRoute.routerPath,
      ImportRequestRoute.auth,
      this.comms,
    )(parameters);

  add = (parameters: add.Request):
    Result<add.EffectiveRequest, add.Response> => controllerGenerator<
      add.Request,
      add.EffectiveRequest,
      add.Response
    >(
      add.controllerGeneratorOptions,
      ImportRequestRoute.routerPath,
      ImportRequestRoute.auth,
      this.comms,
    )(parameters);

  get = (parameters: get.Request):
    Result<get.EffectiveRequest, get.Response> => controllerGenerator<
      get.Request,
      get.EffectiveRequest,
      get.Response
    >(
      get.controllerGeneratorOptions,
      ImportRequestRoute.routerPath,
      ImportRequestRoute.auth,
      this.comms,
    )(parameters);

  delete = (parameters: deleteRoute.Request):
    Result<deleteRoute.EffectiveRequest, deleteRoute.Response> => controllerGenerator<
      deleteRoute.Request,
      deleteRoute.EffectiveRequest,
      deleteRoute.Response
    >(
      deleteRoute.controllerGeneratorOptions,
      ImportRequestRoute.routerPath,
      ImportRequestRoute.auth,
      this.comms,
    )(parameters);

  find = (parameters?: find.Request):
    Result<find.EffectiveRequest, find.Response> => controllerGenerator<
      find.Request,
      find.EffectiveRequest,
      find.Response
    >(
      find.controllerGeneratorOptions,
      ImportRequestRoute.routerPath,
      ImportRequestRoute.auth,
      this.comms,
    )(parameters);

  findTableController = (parameters?: find.Query):
    TableController<find.ResponseRow> => new TableController<find.ResponseRow>(
      this.find,
      parameters,
    );
}
