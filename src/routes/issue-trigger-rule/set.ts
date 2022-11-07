// TODO withthegrid/platform-client/issues/1370 Gabriel: deprecated

import Joi from 'joi';
import { IssueTriggerRule, schema as issueTriggerRuleSchema } from '../../models/issue-trigger-rule';
import { ControllerGeneratorOptionsWithClient } from '../../comms/controller';

type Request = {
  query: Pick<IssueTriggerRule, 'priorityLevel' | 'deviceTypeHashId'>;
  body: {
    issueTriggerRule: {
      missedReports: IssueTriggerRule['missedReports'];
      offlineForSeconds: IssueTriggerRule['offlineForSeconds'];
    } | null;
  };
}
type EffectiveRequest = Request;

type Response = void;

const controllerGeneratorOptions: ControllerGeneratorOptionsWithClient = {
  method: 'post',
  path: '/',
  query: issueTriggerRuleSchema.keys({
    missedReports: Joi.disallow(),
    offlineForSeconds: Joi.disallow(),
  }),
  body: Joi.object().keys({
    issueTriggerRule: issueTriggerRuleSchema.keys({
      priorityLevel: Joi.disallow(),
      deviceTypeHashId: Joi.disallow(),
    }).allow(null),
  }).required(),
  right: { environment: 'ENVIRONMENT_ADMIN' },
  description: 'Creates or updates an issue trigger rule override.',
};

export {
  controllerGeneratorOptions,
  Request,
  EffectiveRequest,
  Response,
};
