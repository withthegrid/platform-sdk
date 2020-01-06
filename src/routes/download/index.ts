import * as get from './get';
import Comms from '../../comms';
import controllerGenerator, { Result } from '../../comms/controller';

class DownloadRoute {
  static routerPath = 'download';

  static auth = false;

  constructor(readonly comms: Comms) {
  }

  get = (parameters: get.Request):
    Result<get.EffectiveRequest, get.Response> => controllerGenerator<
      get.Request,
      get.EffectiveRequest,
      get.Response
    >(
      get.controllerGeneratorOptions,
      DownloadRoute.routerPath,
      DownloadRoute.auth,
      this.comms,
    )(parameters);
}


export default DownloadRoute;
