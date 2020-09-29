import * as addExport from './add-export';
import * as findExportRequest from './find-export-request';
import * as findLog from './find-log';
import * as getReleases from './get-releases';
import * as get from './get';
import * as requestExportDownload from './request-export-download';
import * as update from './update';
import Comms from '../../comms';

import controllerGenerator, { Result } from '../../comms/controller';
import TableController from '../../comms/table-controller';

class SettingsRoute {
  static routerPath = 'settings';

  static auth = true;

  constructor(readonly comms: Comms) {
  }

  addExport = (parameters: addExport.Request):
    Result<addExport.EffectiveRequest, addExport.Response> => controllerGenerator<
      addExport.Request,
      addExport.EffectiveRequest,
      addExport.Response
    >(
      addExport.controllerGeneratorOptions,
      SettingsRoute.routerPath,
      SettingsRoute.auth,
      this.comms,
    )(parameters);

  findExportRequest = (parameters?: findExportRequest.Request):
    Result<findExportRequest.EffectiveRequest, findExportRequest.Response> => controllerGenerator<
      findExportRequest.Request,
      findExportRequest.EffectiveRequest,
      findExportRequest.Response
    >(
      findExportRequest.controllerGeneratorOptions,
      SettingsRoute.routerPath,
      SettingsRoute.auth,
      this.comms,
    )(parameters);

  findExportRequestTableController = (parameters?: findExportRequest.Query):
    TableController<
      findExportRequest.ResponseRow
    > => new TableController<findExportRequest.ResponseRow>(
      this.findExportRequest,
      (row: findExportRequest.ResponseRow) => ({
        lastValueSortColumn: row.exportRequest.createdAt,
        lastValueHashId: row.exportRequest.hashId,
      }),
      parameters,
    );

  findLog = (parameters: findLog.Request):
    Result<findLog.EffectiveRequest, findLog.Response> => controllerGenerator<
      findLog.Request,
      findLog.EffectiveRequest,
      findLog.Response
    >(
      findLog.controllerGeneratorOptions,
      SettingsRoute.routerPath,
      SettingsRoute.auth,
      this.comms,
    )(parameters);

  findLogTableController = (parameters: findLog.Query):
    TableController<findLog.ResponseRow> => new TableController<findLog.ResponseRow>(
      this.findLog,
      (row: findLog.ResponseRow) => ({
        lastValueSortColumn: row.log.hashId,
        lastValueHashId: row.log.hashId,
      }),
      parameters,
    );

  getReleases = (parameters?: getReleases.Request):
    Result<getReleases.EffectiveRequest, getReleases.Response> => controllerGenerator<
      getReleases.Request,
      getReleases.EffectiveRequest,
      getReleases.Response
    >(
      getReleases.controllerGeneratorOptions,
      SettingsRoute.routerPath,
      SettingsRoute.auth,
      this.comms,
    )(parameters);

  get = (parameters: get.Request):
    Result<get.EffectiveRequest, get.Response> => controllerGenerator<
      get.Request,
      get.EffectiveRequest,
      get.Response
    >(
      get.controllerGeneratorOptions,
      SettingsRoute.routerPath,
      SettingsRoute.auth,
      this.comms,
    )(parameters);

  requestExportDownload = (parameters: requestExportDownload.Request):
    Result<
      requestExportDownload.EffectiveRequest,
      requestExportDownload.Response
    > => controllerGenerator<
      requestExportDownload.Request,
      requestExportDownload.EffectiveRequest,
      requestExportDownload.Response
    >(
      requestExportDownload.controllerGeneratorOptions,
      SettingsRoute.routerPath,
      SettingsRoute.auth,
      this.comms,
    )(parameters);

  update = (parameters: update.Request):
    Result<update.EffectiveRequest, update.Response> => controllerGenerator<
      update.Request,
      update.EffectiveRequest,
      update.Response
    >(
      update.controllerGeneratorOptions,
      SettingsRoute.routerPath,
      SettingsRoute.auth,
      this.comms,
    )(parameters);
}

export default SettingsRoute;
