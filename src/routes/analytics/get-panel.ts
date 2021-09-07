import Joi from 'joi';
import { ControllerGeneratorOptionsWithClient } from '../../comms/controller';

import { schema as analyticsPanelSchema, AnalyticsPanel } from '../../models/analytics-panel';

interface Request {
  params: {
    hashId: string;
  };
}

interface Response {
  panel: AnalyticsPanel;
}

const controllerGeneratorOptions: ControllerGeneratorOptionsWithClient = {
  method: 'get',
  path: '/panel/:hashId',
  params: Joi.object().keys({
    hashId: Joi.string().required().example('7usgt'),
  }).required(),
  right: { environment: 'READ' },
  response: Joi.object().keys({
    panel: analyticsPanelSchema.required(),
  }).required(),
  description: 'Get a specific analytics dashboard identified by its hashId',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
