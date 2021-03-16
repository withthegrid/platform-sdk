import Joi from 'joi';
import { ControllerGeneratorOptions } from '../../comms/controller';

import { schema as edgeSchema, Edge } from '../../models/edge';
import { schema as pinSchema, Pin } from '../../models/pin';
import { schema as pinGroupSchema, PinGroup } from '../../models/pin-group';
import { schema as measurementCycleSchema, MeasurementCycle } from '../../models/measurement-cycle';
import { schema as thresholdSchema, Threshold } from '../../models/threshold';
import { schema as quantitySchema, Quantity } from '../../models/quantity';

interface Request {
  params: {
    hashId: string;
  };
}

interface Response {
  edge: Edge;
  pins: Pin[];
  pinGroups: PinGroup[];
  measurementCycles: Array<MeasurementCycle | null>;
  nextReportBefore: Date | null;
  thresholds: {
    value: Threshold;
    quantity: Quantity;
  }[];
  photo: string | null;
}

const controllerGeneratorOptions: ControllerGeneratorOptions = {
  method: 'get',
  path: '/edge/:hashId',
  params: Joi.object().keys({
    hashId: Joi.string().required().example('ka08d'),
  }).required(),
  right: { environment: 'READ' },
  response: (apiVersion: number): Joi.ObjectSchema => Joi.object().keys({
    edge: edgeSchema.required(),
    pins: Joi.array().items(pinSchema).required(),
    pinGroups: Joi.array().items(pinGroupSchema(apiVersion)).required(),
    measurementCycles: Joi.array().items(measurementCycleSchema.allow(null)).required(),
    thresholds: Joi.array().items(Joi.object().keys({
      value: thresholdSchema.required(),
      quantity: quantitySchema.required(),
    })).required(),
    photo: Joi.string().allow(null).required().description('base64 encoded string')
      .example('iVBORw0KGgoAAAANSUhEUgAAB9AAAAhwCAYAAAB1bKV...'),
  }).required(),
  description: 'Get a specific edge identified by its hashId',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
