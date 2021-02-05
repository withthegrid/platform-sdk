import Joi from 'joi';
import { ControllerGeneratorOptions } from '../../comms/controller';

import { schema as quantitySchema, Quantity } from '../../models/quantity';
import { schema as pinSchema, Pin } from '../../models/pin';
import { schema as pinGroupSchema, PinGroup } from '../../models/pin-group';
import { schema as thresholdSchema, Threshold } from '../../models/threshold';

interface Request {
  query: { pinGroupHashId: string }
  | { gridHashId: string }
  | { edgeHashId: string }
  | { pinHashId: string };
}

interface Response {
  charts: {
    title: string | null;
    series: {
      quantity: Quantity;
      pin: Pin;
      pinGroup: PinGroup;
      color: string;
      threshold: Threshold | null;
    }[];
  }[];
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
    charts: Joi.array().items(Joi.object().keys({
      title: Joi.string().allow(null).example(null).required(),
      series: Joi.array().items(Joi.object().keys({
        quantity: quantitySchema.required(),
        pin: pinSchema.required(),
        pinGroup: pinGroupSchema(apiVersion).required(),
        color: Joi.string().example('#ff0000').description('A hex color string').required(),
        threshold: thresholdSchema.allow(null).required(),
      })).required(),
    })).required(),
  }).required(),
  description: 'Get the chart panel for a pinGroup, grid, edge or pin',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
