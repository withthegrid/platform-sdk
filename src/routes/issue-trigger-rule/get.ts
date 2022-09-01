import Joi from 'joi';
import { DeviceType, schema as deviceTypeSchema } from '../../models/device-type';
import { ControllerGeneratorOptionsWithClient } from '../../comms/controller';
import { IssueTriggerRule, schema as issueTriggerRuleSchema } from '../../models/issue-trigger-rule';

type Request = {
  query: Pick<IssueTriggerRule, 'deviceTypeHashId' | 'priorityLevel'>;
};
type EffectiveRequest = Request;

type Response = {
  issueTriggerRule: IssueTriggerRule;
  deviceType?: DeviceType;
};

const controllerGeneratorOptions: ControllerGeneratorOptionsWithClient = {
  method: 'get',
  path: '/',
  query: Joi.object().keys({
    deviceTypeHashId: Joi.string().example('xd2rd4'),
    priorityLevel: Joi.number().integer().valid(1, 2).required(),
  }),
  right: { environment: 'READ' },
  response: (apiVersion: number) => Joi.object().keys({
    issueTriggerRule: issueTriggerRuleSchema,
    deviceType: deviceTypeSchema(apiVersion),
  }),
  description: 'Gets a specific issue trigger rule by its priorityLevel and/or deviceTypeHashId.',
};

export {
  controllerGeneratorOptions,
  Request,
  EffectiveRequest,
  Response,
};
