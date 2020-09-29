import * as claim from './claim';
import * as deleteRoute from './delete';
import * as find from './find';
import * as getClaimToken from './get-claim-token';
import * as get from './get';
import * as link from './link';
import * as unclaim from './unclaim';
import * as unlink from './unlink';
import * as update from './update';

import Comms from '../../comms';
import controllerGenerator, { Result } from '../../comms/controller';
import TableController from '../../comms/table-controller';

class DeviceRoute {
  static routerPath = 'device';

  static auth = true;

  constructor(readonly comms: Comms) {
  }

  claim = (parameters: claim.Request):
    Result<claim.EffectiveRequest, claim.Response> => controllerGenerator<
      claim.Request,
      claim.EffectiveRequest,
      claim.Response
    >(
      claim.controllerGeneratorOptions,
      DeviceRoute.routerPath,
      DeviceRoute.auth,
      this.comms,
    )(parameters);

  delete = (parameters: deleteRoute.Request):
    Result<deleteRoute.EffectiveRequest, deleteRoute.Response> => controllerGenerator<
      deleteRoute.Request,
      deleteRoute.EffectiveRequest,
      deleteRoute.Response
    >(
      deleteRoute.controllerGeneratorOptions,
      DeviceRoute.routerPath,
      DeviceRoute.auth,
      this.comms,
    )(parameters);

  find = (parameters?: find.Request):
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

  findTableController = (parameters?: find.Query):
    TableController<find.ResponseRow> => new TableController<find.ResponseRow>(
      this.find,
      (row: find.ResponseRow) => ({
        lastValueSortColumn: row.device.hashId,
        lastValueHashId: row.device.hashId,
      }),
      parameters,
    );

  getClaimToken = (parameters: getClaimToken.Request):
    Result<getClaimToken.EffectiveRequest, getClaimToken.Response> => controllerGenerator<
      getClaimToken.Request,
      getClaimToken.EffectiveRequest,
      getClaimToken.Response
    >(
      getClaimToken.controllerGeneratorOptions,
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

  unclaim = (parameters: unclaim.Request):
    Result<unclaim.EffectiveRequest, unclaim.Response> => controllerGenerator<
      unclaim.Request,
      unclaim.EffectiveRequest,
      unclaim.Response
    >(
      unclaim.controllerGeneratorOptions,
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

  update = (parameters: update.Request):
    Result<update.EffectiveRequest, update.Response> => controllerGenerator<
      update.Request,
      update.EffectiveRequest,
      update.Response
    >(
      update.controllerGeneratorOptions,
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
