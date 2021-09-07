import Joi from 'joi';
import { ControllerGeneratorOptionsWithClient } from '../../comms/controller';

import { schema as analyticsQuerySchema, AnalyticsQuery } from '../../models/analytics-query';
import { schema as analyticsVisualisationSchema, AnalyticsVisualisation } from '../../models/analytics-visualisation';

interface Request {
  params: {
    hashId: string;
  };
  body: {
    title?: string;
    cards?: {
      title: string;
      query: AnalyticsQuery;
      visualisation: AnalyticsVisualisation;
    }[];
  };
}

type Response = void;

const controllerGeneratorOptions: ControllerGeneratorOptionsWithClient = {
  method: 'post',
  path: '/:hashId',
  params: Joi.object().keys({
    hashId: Joi.string().required().example('7usgt'),
  }).required(),
  body: Joi.object().keys({
    title: Joi.string().example('My dashboard'),
    cards: Joi.array().items(Joi.object().keys({
      title: Joi.string().required().example('My widget'),
      query: analyticsQuerySchema.required(),
      visualisation: analyticsVisualisationSchema.required(),
    })),
  }).required(),
  right: { environment: 'REPORTS' },
  description: 'Update an analytics dashboard',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
