import Joi from 'joi';
import { ControllerGeneratorOptionsWithClient } from '../../comms/controller';
import { IssueTriggerRule } from '../../models/issue-trigger-rule';

type Request = {
  query: {
    clientHashId: string
    deviceTypeHashId?: string
  }
};
type EffectiveRequest = Request;

type Response = Array<IssueTriggerRule>

const controllerGeneratorOptions: ControllerGeneratorOptionsWithClient = {
  method: 'get',
  path: '/',
  query: Joi.object().keys({
    clientHashId: Joi.string().example('xd2rd4').required(),
    deviceTypeHashId: Joi.string().example('xd2rd4'),
  }),
  right: { environment: 'READ' },
  response: Joi.array().items(
    Joi.object().keys({
      clientHashId: Joi.string().example('xd2rd4').required(),
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
