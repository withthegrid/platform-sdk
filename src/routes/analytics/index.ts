import * as addPanel from './add-panel';
import * as deletePanel from './delete-panel';
import * as find from './find';
import * as findPanel from './find-panel';
import * as getPanel from './get-panel';
import * as updatePanel from './update-panel';

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

  addPanel = (parameters: addPanel.Request):
    Result<addPanel.EffectiveRequest, addPanel.Response> => controllerGenerator<
      addPanel.Request,
      addPanel.EffectiveRequest,
      addPanel.Response
    >(
      addPanel.controllerGeneratorOptions,
      AnalyticsRoute.routerPath,
      AnalyticsRoute.auth,
      this.comms,
    )(parameters);

  deletePanel = (parameters: deletePanel.Request):
    Result<deletePanel.EffectiveRequest, deletePanel.Response> => controllerGenerator<
      deletePanel.Request,
      deletePanel.EffectiveRequest,
      deletePanel.Response
    >(
      deletePanel.controllerGeneratorOptions,
      AnalyticsRoute.routerPath,
      AnalyticsRoute.auth,
      this.comms,
    )(parameters);

  findPanel = (parameters: findPanel.Request):
    Result<findPanel.EffectiveRequest, findPanel.Response> => controllerGenerator<
      findPanel.Request,
      findPanel.EffectiveRequest,
      findPanel.Response
    >(
      findPanel.controllerGeneratorOptions,
      AnalyticsRoute.routerPath,
      AnalyticsRoute.auth,
      this.comms,
    )(parameters);

  findPanelTableController = (parameters: findPanel.Query):
    TableController<findPanel.ResponseRow> => new TableController<findPanel.ResponseRow>(
      this.findPanel,
      (row: findPanel.ResponseRow, sortBy: string) => {
        let lastValueSortColumn;
        if (sortBy === 'title') {
          lastValueSortColumn = row.panel.title;
        } else {
          lastValueSortColumn = row.panel.hashId;
        }
        return {
          lastValueSortColumn,
          lastValueHashId: row.panel.hashId,
        };
      },
      parameters,
    );

  getPanel = (parameters: getPanel.Request):
    Result<getPanel.EffectiveRequest, getPanel.Response> => controllerGenerator<
      getPanel.Request,
      getPanel.EffectiveRequest,
      getPanel.Response
    >(
      getPanel.controllerGeneratorOptions,
      AnalyticsRoute.routerPath,
      AnalyticsRoute.auth,
      this.comms,
    )(parameters);

  updatePanel = (parameters: updatePanel.Request):
    Result<updatePanel.EffectiveRequest, updatePanel.Response> => controllerGenerator<
      updatePanel.Request,
      updatePanel.EffectiveRequest,
      updatePanel.Response
    >(
      updatePanel.controllerGeneratorOptions,
      AnalyticsRoute.routerPath,
      AnalyticsRoute.auth,
      this.comms,
    )(parameters);
}

export default AnalyticsRoute;
