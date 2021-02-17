import Joi from 'joi';
import { ControllerGeneratorOptions } from '../../comms/controller';

import { schema as chartSchema, Chart } from '../../models/chart';

interface Request {
  query: { pinGroupHashId: string }
  | { gridHashId: string }
  | { edgeHashId: string }
  | { pinHashId: string };
}

interface Response {
  lastMode: 'manual' | 'automatic';
  charts: {
    automatic: Chart[],
    manual: Chart[],
  };
}

const controllerGeneratorOptions: ControllerGeneratorOptions = {
  method: 'get',
  path: '/panel',
  query: Joi.alternatives().try(
    Joi.object().keys({ pinGroupHashId: Joi.string().required().example('dao97') }).required(),
    Joi.object().keys({ gridHashId: Joi.string().required().example('naud51') }).required(),
    Joi.object().keys({ edgeHashId: Joi.string().required().example('ka08d') }).required(),
    Joi.object().keys({ pinHashId: Joi.string().required().example('e13d57') }).required(),
  ).required(),
  right: { environment: 'READ' },
  response: (apiVersion: number): Joi.ObjectSchema => Joi.object().keys({
    lastMode: Joi.string().valid('manual', 'automatic').example('automatic').required(),
    charts: Joi.object().keys({
      automatic: Joi.array().items(chartSchema(apiVersion)).required(),
      manual: Joi.array().items(chartSchema(apiVersion)).required(),
    }).required(),
  }).required(),
  description: 'Get the chart panel for a pinGroup, grid, edge or pin',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
