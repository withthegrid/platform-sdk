import * as get from './get';
import * as getPanel from './get-panel';
import * as updatePanel from './update-panel';

import Comms from '../../comms';
import controllerGenerator, { Result } from '../../comms/controller';

class ChartRoute {
  static routerPath = 'chart';

  static auth = true;

  constructor(readonly comms: Comms) {
  }

  get = (parameters: get.Request):
    Result<get.EffectiveRequest, get.Response> => controllerGenerator<
      get.Request,
      get.EffectiveRequest,
      get.Response
    >(
      get.controllerGeneratorOptions,
      ChartRoute.routerPath,
      ChartRoute.auth,
      this.comms,
    )(parameters);

  getPanel = (parameters: getPanel.Request):
    Result<getPanel.EffectiveRequest, getPanel.Response> => controllerGenerator<
      getPanel.Request,
      getPanel.EffectiveRequest,
      getPanel.Response
    >(
      getPanel.controllerGeneratorOptions,
      ChartRoute.routerPath,
      ChartRoute.auth,
      this.comms,
    )(parameters);

  updatePanel = (parameters: updatePanel.Request):
    Result<updatePanel.EffectiveRequest, updatePanel.Response> => controllerGenerator<
      updatePanel.Request,
      updatePanel.EffectiveRequest,
      updatePanel.Response
    >(
      updatePanel.controllerGeneratorOptions,
      ChartRoute.routerPath,
      ChartRoute.auth,
      this.comms,
    )(parameters);
}

export default ChartRoute;
