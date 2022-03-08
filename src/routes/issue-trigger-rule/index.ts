import Comms from '../../comms';
import controllerGenerator, { Result } from '../../comms/controller';
import {
  add, update, delete as deleteRoute, get, find,
} from './routes';

export default class IssueTriggerRuleRoute {
  static routerPath = 'issue-trigger-rule';
  static auth = true;

  constructor(readonly comms: Comms) {}

  public add(parameters: add.Request): Result<add.EffectiveRequest, add.Response> {
    return controllerGenerator<
      add.Request,
      add.EffectiveRequest,
      add.Response
    >(
      add.controllerGeneratorOptions,
      IssueTriggerRuleRoute.routerPath,
      IssueTriggerRuleRoute.auth,
      this.comms,
    )(parameters);
  }

  public update(parameters: update.Request): Result<update.EffectiveRequest, update.Response> {
    return controllerGenerator<
      update.Request,
      update.EffectiveRequest,
      update.Response
    >(
      update.controllerGeneratorOptions,
      IssueTriggerRuleRoute.routerPath,
      IssueTriggerRuleRoute.auth,
      this.comms,
    )(parameters);
  }

  public deleteRoute(parameters: deleteRoute.Request):
    Result<deleteRoute.EffectiveRequest, deleteRoute.Response> {
    return controllerGenerator<
      deleteRoute.Request,
      deleteRoute.EffectiveRequest,
      deleteRoute.Response
    >(
      deleteRoute.controllerGeneratorOptions,
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

  public find(parameters: find.Request):
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
}
