import Joi from 'joi';
import { ControllerGeneratorOptionsWithClient } from '../../comms/controller';
import { IssueTriggerRule } from '../../models/issue-trigger-rule';

type HashId = string;

type Request = {
  params: {
    hashId: HashId
  }
  body: Omit<IssueTriggerRule, 'clientHashId' | 'deviceTypeHashId'>
}
type EffectiveRequest = Request;

type Response = void

const JoiHashId = Joi.string().required().example('xd2rd4');

const controllerGeneratorOptions: ControllerGeneratorOptionsWithClient = {
  method: 'put',
  path: '/:hashId',
  params: Joi.object().keys({
    hashId: JoiHashId,
  }).required(),
  body: Joi.object().keys({
    priorityLevel: Joi.number().integer().valid(1, 2).required()
      .example('1'),
    missedReports: Joi.number().integer().required().example('12'),
    offlineForSeconds: Joi.number().integer().required().example('1800'),
  }),
  right: { environment: 'ENVIRONMENT_ADMIN' },
  description: 'Updates an existing issue trigger rule override',
};

export {
  controllerGeneratorOptions,
  Request,
  EffectiveRequest,
  Response,
};
