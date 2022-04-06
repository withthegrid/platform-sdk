import TableController from '../../comms/table-controller';
import Comms from '../../comms';
import controllerGenerator, { Result } from '../../comms/controller';
import {
  set, get, find,
} from './routes';

export default class IssueTriggerRuleRoute {
  static routerPath = 'issue-trigger-rule';
  static auth = true;

  constructor(private readonly comms: Comms) {}

  public set(parameters: set.Request): Result<set.EffectiveRequest, set.Response> {
    return controllerGenerator<
      set.Request,
      set.EffectiveRequest,
      set.Response
    >(
      set.controllerGeneratorOptions,
      IssueTriggerRuleRoute.routerPath,
      IssueTriggerRuleRoute.auth,
      this.comms,
    )(parameters);
  }

  public get(parameters: get.Request): Result<get.EffectiveRequest, get.Response> {
    return controllerGenerator<
      get.Request,
      get.EffectiveRequest,
      get.Response
    >(
      get.controllerGeneratorOptions,
      IssueTriggerRuleRoute.routerPath,
      IssueTriggerRuleRoute.auth,
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
        IssueTriggerRuleRoute.routerPath,
        IssueTriggerRuleRoute.auth,
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
