import * as find from './find';
import * as set from './set';

import Comms from '../../comms';
import controllerGenerator, { Result } from '../../comms/controller';
import TableController from '../../comms/table-controller';

class MeasurementThresholdRoute {
  static routerPath = 'measurement-threshold';

  static auth = true;

  constructor(readonly comms: Comms) {
  }

  set = (parameters: set.Request):
    Result<set.EffectiveRequest, set.Response> => controllerGenerator<
      set.Request,
      set.EffectiveRequest,
      set.Response
    >(
      set.controllerGeneratorOptions,
      MeasurementThresholdRoute.routerPath,
      MeasurementThresholdRoute.auth,
      this.comms,
    )(parameters);

  find = (parameters?: find.Request):
    Result<find.EffectiveRequest, find.Response> => controllerGenerator<
      find.Request,
      find.EffectiveRequest,
      find.Response
    >(
      find.controllerGeneratorOptions,
      MeasurementThresholdRoute.routerPath,
      MeasurementThresholdRoute.auth,
      this.comms,
    )(parameters);

  findTableController = (parameters?: find.Query):
    TableController<find.ResponseRow> => new TableController<find.ResponseRow>(
      this.find,
      parameters,
    );
}

export default MeasurementThresholdRoute;
