import Joi from 'joi';
import { ControllerGeneratorOptionsWithClient } from '../../comms/controller';
import { IssueTriggerRule } from '../../models/issue-trigger-rule';

type HashId = string;
type Request = {
  params: {
    deviceTypeHashId: HashId
  }
}
type EffectiveRequest = Request;

type Response = Array<IssueTriggerRule>

const controllerGeneratorOptions: ControllerGeneratorOptionsWithClient = {
  method: 'get',
  path: '/deviceType/:deviceTypeHashId',
  params: Joi.object().keys({
    deviceTypeHashId: Joi.string().required().example('xd2rd4'),
  }),
  right: { environment: 'READ' },
  response: Joi.array().items(
    Joi.object().keys({
      priorityLevel: Joi.number().integer().valid(1, 2).example('1'),
      missedReports: Joi.number().integer().required().example('12'),
      offlineForSeconds: Joi.number().integer().required().example('1800'),
    }),
  ),
  description: 'Returns all issue trigger rules for an decive type',
};

export {
  controllerGeneratorOptions,
  Request,
  EffectiveRequest,
  Response,
};
