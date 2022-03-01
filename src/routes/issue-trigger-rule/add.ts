import Joi from 'joi';
import { IssueTriggerRule } from '../../models/issue-trigger-rule';
import { ControllerGeneratorOptionsWithClient } from '../../comms/controller';

type HashId = string;

type Request = {
  body: {
    deviceTypeHashId?: string
  } & IssueTriggerRule
}
type EffectiveRequest = Request;

type Response = { hashId: HashId }

const controllerGeneratorOptions: ControllerGeneratorOptionsWithClient = {
  method: 'post',
  path: '/',
  body: Joi.object().keys({
    deviceTypeHashId: Joi.string().example('xd2rd4'),
    priorityLevel: Joi.number().integer().valid(1, 2).required()
      .example('1'),
    missedReports: Joi.number().integer().required().example('12'),
    offlineForSeconds: Joi.number().integer().required().example('1800'),
  }),
  right: { environment: 'ENVIRONMENT_ADMIN' },
  response: Joi.object().keys({
    hashId: Joi.string().required().example('xd2rd4'),
  }),
  description: 'Creates an issue trigger rule override',
};

export {
  controllerGeneratorOptions,
  Request,
  EffectiveRequest,
  Response,
};
