import Joi from '@hapi/joi';
import { ControllerGeneratorOptions } from '../../comms/controller';

import { schema as pinGroupSchema, PinGroup } from '../../models/pin-group';
import { schema as pinSchema, Pin } from '../../models/pin';
import { schema as pinLinkSchema, PinLink } from '../../models/pin-link';
import { schema as edgeSchema, Edge } from '../../models/edge';
import { schema as gridSchema, Grid } from '../../models/grid';
import { schema as measurementCycleSchema, MeasurementCycle } from '../../models/measurement-cycle';
import { schema as thresholdSchema, Threshold } from '../../models/threshold';
import { schema as quantitySchema, Quantity } from '../../models/quantity';
import { schema as fileFromServerSchema, FileFromServer } from '../../models/file-from-server';

interface Request {
  params: {
    hashId: string;
  };
}

interface Response {
  pinGroup: PinGroup;
  pins: Pin[];
  pinLinks: PinLink[];
  edges: Edge[];
  grid: Grid | null;
  linkedDeviceHashId: string | null;
  deviceTypeKey: string | null;
  channelMapping: {
    channel: number;
    pinHashId: string | null;
  }[] | null;
  measurementCycle: MeasurementCycle | null;
  thresholds: {
    value: Threshold;
    quantity: Quantity;
  }[];
  photo: string | null;
  files: FileFromServer[];
}


const controllerGeneratorOptions: ControllerGeneratorOptions = {
  method: 'get',
  path: '/pin-group/:hashId',
  params: Joi.object().keys({
    hashId: Joi.string().required().example('dao97'),
  }).required(),
  right: { environment: 'READ' },
  response: Joi.object().keys({
    pinGroup: pinGroupSchema.required(),
    pins: Joi.array().items(pinSchema).required(),
    pinLinks: Joi.array().items(pinLinkSchema).required(),
    edges: Joi.array().items(edgeSchema).required(),
    grid: gridSchema.allow(null).required(),
    linkedDeviceHashId: Joi.string().required().allow(null).example('j1iha9'),
    deviceTypeKey: Joi.string().required().allow(null).example('cp-pole'),
    channelMapping: Joi.array().items(Joi.object().keys({
      channel: Joi.number().integer().required().example(0),
      pinHashId: Joi.string().allow(null).default(null),
    })).required().allow(null),
    measurementCycle: measurementCycleSchema.allow(null).required(),
    thresholds: Joi.array().items(Joi.object().keys({
      value: thresholdSchema.required(),
      quantity: quantitySchema.required(),
    })).required(),
    photo: Joi.string().allow(null).required().description('base64 encoded string')
      .example('iVBORw0KGgoAAAANSUhEUgAAB9AAAAhwCAYAAAB1bKV...'),
    files: Joi.array().items(fileFromServerSchema).required(),
  }).required(),
  description: 'Get a specific pin group identified by its hashId',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
