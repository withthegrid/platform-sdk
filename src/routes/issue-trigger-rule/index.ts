import Comms from '../../comms';
import controllerGenerator, { Result } from '../../comms/controller';
import {
  add, update, delete as deleteRoute, get, getByClient, getByDeviceType,
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

  public getByClient(parameters: getByClient.Request):
    Result<getByClient.EffectiveRequest, getByClient.Response> {
    return controllerGenerator<
      getByClient.Request,
      getByClient.EffectiveRequest,
      getByClient.Response
    >(
      getByClient.controllerGeneratorOptions,
      IssueTriggerRuleRoute.routerPath,
      IssueTriggerRuleRoute.auth,
      this.comms,
    )(parameters);
  }

  public getByDeviceType(parameters: getByDeviceType.Request):
    Result<getByDeviceType.EffectiveRequest, getByDeviceType.Response> {
    return controllerGenerator<
      getByDeviceType.Request,
      getByDeviceType.EffectiveRequest,
      getByDeviceType.Response
    >(
      getByDeviceType.controllerGeneratorOptions,
      IssueTriggerRuleRoute.routerPath,
      IssueTriggerRuleRoute.auth,
      this.comms,
    )(parameters);
  }
}
