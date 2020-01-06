import * as find from './find';
import * as link from './link';
import * as unlink from './unlink';
import * as get from './get';

import Comms from '../../comms';
import controllerGenerator, { Result } from '../../comms/controller';
import TableController from '../../comms/table-controller';


class DeviceRoute {
  static routerPath = 'device';

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
      DeviceRoute.routerPath,
      DeviceRoute.auth,
      this.comms,
    )(parameters);


  findTableController = (parameters: find.Query):
    TableController<find.ResponseRow> => new TableController<find.ResponseRow>(
      this.find,
      (row: find.ResponseRow) => ({
        lastValueSortColumn: row.device.hashId,
        lastValueHashId: row.device.hashId,
      }),
      parameters,
    );


  link = (parameters: link.Request):
    Result<link.EffectiveRequest, link.Response> => controllerGenerator<
      link.Request,
      link.EffectiveRequest,
      link.Response
    >(
      link.controllerGeneratorOptions,
      DeviceRoute.routerPath,
      DeviceRoute.auth,
      this.comms,
    )(parameters);

  unlink = (parameters: unlink.Request):
    Result<unlink.EffectiveRequest, unlink.Response> => controllerGenerator<
      unlink.Request,
      unlink.EffectiveRequest,
      unlink.Response
    >(
      unlink.controllerGeneratorOptions,
      DeviceRoute.routerPath,
      DeviceRoute.auth,
      this.comms,
    )(parameters);

  get = (parameters: get.Request):
    Result<get.EffectiveRequest, get.Response> => controllerGenerator<
      get.Request,
      get.EffectiveRequest,
      get.Response
    >(
      get.controllerGeneratorOptions,
      DeviceRoute.routerPath,
      DeviceRoute.auth,
      this.comms,
    )(parameters);
}

const routes = {
  find,
  link,
  unlink,
  get,
};

export default DeviceRoute;
export { routes };
