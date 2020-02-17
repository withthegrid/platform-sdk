import * as add from './add';
import * as deleteRoute from './delete';
import * as find from './find';
import * as update from './update';

import Comms from '../../comms';
import controllerGenerator, { Result } from '../../comms/controller';
import TableController from '../../comms/table-controller';


class IssueRoute {
  static routerPath = 'label';

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
      IssueRoute.routerPath,
      IssueRoute.auth,
      this.comms,
    )(parameters);

  delete = (parameters: deleteRoute.Request):
    Result<deleteRoute.EffectiveRequest, deleteRoute.Response> => controllerGenerator<
      deleteRoute.Request,
      deleteRoute.EffectiveRequest,
      deleteRoute.Response
    >(
      deleteRoute.controllerGeneratorOptions,
      IssueRoute.routerPath,
      IssueRoute.auth,
      this.comms,
    )(parameters);

  find = (parameters: find.Request):
    Result<find.EffectiveRequest, find.Response> => controllerGenerator<
      find.Request,
      find.EffectiveRequest,
      find.Response
    >(
      find.controllerGeneratorOptions,
      IssueRoute.routerPath,
      IssueRoute.auth,
      this.comms,
    )(parameters);


  findTableController = (parameters: find.Query):
    TableController<find.ResponseRow> => new TableController<find.ResponseRow>(
      this.find,
      (row: find.ResponseRow) => ({
        lastValueSortColumn: row.label.name,
        lastValueHashId: row.label.hashId,
      }),
      parameters,
    );

  update = (parameters: update.Request):
    Result<update.EffectiveRequest, update.Response> => controllerGenerator<
      update.Request,
      update.EffectiveRequest,
      update.Response
    >(
      update.controllerGeneratorOptions,
      IssueRoute.routerPath,
      IssueRoute.auth,
      this.comms,
    )(parameters);
}

export default IssueRoute;
