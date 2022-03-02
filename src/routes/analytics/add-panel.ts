import Joi from 'joi';
import { schema as analyticsQuerySchema, AnalyticsQuery } from '../../models/analytics-query';
import { schema as analyticsVisualisationSchema, AnalyticsVisualisation } from '../../models/analytics-visualisation';
import { ControllerGeneratorOptionsWithClient } from '../../comms/controller';
import { AnalyticsPanelLayout, layoutSchema } from '../../models/analytics-panel';

interface Request {
  body: {
    title: string;
    layout: AnalyticsPanelLayout;
    cards: {
      title: string;
      subtitle?: string;
      query: AnalyticsQuery;
      visualisation: AnalyticsVisualisation;
    }[];
  };
}

type EffectiveRequest = {
  body: Required<Request['body']>;
}

interface Response {
  hashId: string;
}

const controllerGeneratorOptions: ControllerGeneratorOptionsWithClient = {
  method: 'post',
  path: '/panel',
  body: Joi.object().keys({
    title: Joi.string().required().example('My dashboard'),
    layout: layoutSchema.default([]),
    cards: Joi.array().items(Joi.object().keys({
      title: Joi.string().required().example('My widget'),
      subtitle: Joi.string().allow('').example('My widget description'),
      // TODO srieding joi.link does not work with our joi-to-swagger library.
      // query: analyticsQuerySchema.required(),
      visualisation: analyticsVisualisationSchema.required(),
    })).required(),
  }).required(),
  right: { environment: 'REPORTS' },
  response: Joi.object().keys({
    hashId: Joi.string().required().example('7usgt'),
  }).required(),
  description: 'Create an analytics dashboard',
};

export {
  controllerGeneratorOptions,
  Request,
  EffectiveRequest,
  Response,
};
