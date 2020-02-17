import * as deleteRoute from './delete';
import * as update from './update';

import Comms from '../../comms';
import controllerGenerator, { Result } from '../../comms/controller';


class IssueRoute {
  static routerPath = 'issue-comment';

  static auth = true;

  constructor(readonly comms: Comms) {
  }


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
