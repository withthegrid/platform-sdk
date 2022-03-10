import Joi from 'joi';
import { IssueTriggerRule, schema } from '../../models/issue-trigger-rule';
import { ControllerGeneratorOptionsWithClient } from '../../comms/controller';

type Request = {
  query: Pick<IssueTriggerRule, 'priorityLevel' | 'deviceTypeHashId'>;
  body: {
    missedReports?: IssueTriggerRule['missedReports'];
    offlineForSeconds?: IssueTriggerRule['offlineForSeconds'];
  };
}
type EffectiveRequest = Request;

type Response = void;

const controllerGeneratorOptions: ControllerGeneratorOptionsWithClient = {
  method: 'post',
  path: '/',
  query: schema.keys({
    missedReports: Joi.disallow(),
    offlineForSeconds: Joi.disallow(),
  }),
  body: schema.keys({
    priorityLevel: Joi.disallow(),
    deviceTypeHashId: Joi.disallow(),
    missedReports: Joi.optional(),
    offlineForSeconds: Joi.optional(),
  }).optional(),
  right: { environment: 'ENVIRONMENT_ADMIN' },
  description: 'Creates or updates an issue trigger rule override.',
};

export {
  controllerGeneratorOptions,
  Request,
  EffectiveRequest,
  Response,
};
