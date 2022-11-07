import TableController from '../../comms/table-controller';
import Comms from '../../comms';
import controllerGenerator, { Result } from '../../comms/controller';
import {
  set, find,
} from './routes';

export default class ConnectivityThresholdRoute {
  static routerPath = 'connectivity-threshold';
  static auth = true;

  constructor(private readonly comms: Comms) {}

  public set(parameters: set.Request): Result<set.EffectiveRequest, set.Response> {
    return controllerGenerator<
      set.Request,
      set.EffectiveRequest,
      set.Response
    >(
      set.controllerGeneratorOptions,
      ConnectivityThresholdRoute.routerPath,
      ConnectivityThresholdRoute.auth,
      this.comms,
    )(parameters);
  }

  public find(parameters?: find.Request):
    Result<find.EffectiveRequest, find.Response> {
    return controllerGenerator<
        find.Request,
        find.EffectiveRequest,
        find.Response
      >(
        find.controllerGeneratorOptions,
        ConnectivityThresholdRoute.routerPath,
        ConnectivityThresholdRoute.auth,
        this.comms,
      )(parameters);
  }

  public findTableController(parameters?: find.Query):
    TableController<find.ResponseRow> {
    return new TableController<find.ResponseRow>(
      this.find,
      parameters,
    );
  }
}
