import * as add from './add';
import * as deleteRoute from './delete';
import * as find from './find';
import * as get from './get';

import Comms from '../../comms';
import controllerGenerator, { Result } from '../../comms/controller';
import TableController from '../../comms/table-controller';


class ReportTypeRoute {
  static routerPath = 'report-type';

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
      ReportTypeRoute.routerPath,
      ReportTypeRoute.auth,
      this.comms,
    )(parameters);


  delete = (parameters: deleteRoute.Request):
    Result<deleteRoute.EffectiveRequest, deleteRoute.Response> => controllerGenerator<
      deleteRoute.Request,
      deleteRoute.EffectiveRequest,
      deleteRoute.Response
    >(
      deleteRoute.controllerGeneratorOptions,
      ReportTypeRoute.routerPath,
      ReportTypeRoute.auth,
      this.comms,
    )(parameters);

  find = (parameters: find.Request):
    Result<find.EffectiveRequest, find.Response> => controllerGenerator<
      find.Request,
      find.EffectiveRequest,
      find.Response
    >(
      find.controllerGeneratorOptions,
      ReportTypeRoute.routerPath,
      ReportTypeRoute.auth,
      this.comms,
    )(parameters);


  findTableController = (parameters: find.Query):
    TableController<find.ResponseRow> => new TableController<find.ResponseRow>(
      this.find,
      (row: find.ResponseRow, sortBy: string) => {
        let lastValueSortColumn;
        if (sortBy === 'name') {
          lastValueSortColumn = row.reportType.name;
        } else {
          lastValueSortColumn = row.reportType.hashId;
        }
        return {
          lastValueSortColumn,
          lastValueHashId: row.reportType.hashId,
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
      ReportTypeRoute.routerPath,
      ReportTypeRoute.auth,
      this.comms,
    )(parameters);
}

export default ReportTypeRoute;
