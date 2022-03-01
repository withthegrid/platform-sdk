import Joi from 'joi';
import { ControllerGeneratorOptionsWithClient } from '../../comms/controller';
import { IssueTriggerRule } from '../../models/issue-trigger-rule';

type HashId = string;
type Request = never;
type EffectiveRequest = Request;

type EnvironmentIssueTriggerRule = {
  deviceTypeHashId?: HashId,
} & IssueTriggerRule;

type Response = Array<EnvironmentIssueTriggerRule>

const controllerGeneratorOptions: ControllerGeneratorOptionsWithClient = {
  method: 'get',
  path: '/client',
  right: { environment: 'READ' },
  response: Joi.array().items(
    Joi.object().keys({
      deviceTypeHashId: Joi.string().example('xd2rd4'),
      priorityLevel: Joi.number().integer().valid(1, 2).example('1'),
      missedReports: Joi.number().integer().required().example('12'),
      offlineForSeconds: Joi.number().integer().required().example('1800'),
    }),
  ),
  description: 'Returns all issue trigger rules for an environment',
};

export {
  controllerGeneratorOptions,
  Request,
  EffectiveRequest,
  Response,
};
