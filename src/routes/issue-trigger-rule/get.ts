import Joi from 'joi';
import { ControllerGeneratorOptionsWithClient } from '../../comms/controller';
import { IssueTriggerRule } from '../../models/issue-trigger-rule';

type HashId = string;
type Request = {
  params: {
    hashId: HashId
  }
};
type EffectiveRequest = Request;

type Response = IssueTriggerRule

const controllerGeneratorOptions: ControllerGeneratorOptionsWithClient = {
  method: 'get',
  path: '/:hashId',
  params: Joi.object().keys({
    hashId: Joi.string().required().example('xd2rd4'),
  }),
  right: { environment: 'READ' },
  response: Joi.object().keys({
    clientHashId: Joi.string().example('xd2rd4').required(),
    deviceTypeHashId: Joi.string().example('xd2rd4'),
    priorityLevel: Joi.number().integer().valid(1, 2).example('1'),
    missedReports: Joi.number().integer().required().example('12'),
    offlineForSeconds: Joi.number().integer().required().example('1800'),
  }),
  description: 'Gets a specific issue trigger rule by its hashId',
};

export {
  controllerGeneratorOptions,
  Request,
  EffectiveRequest,
  Response,
};
