import Joi from 'joi';
import { ControllerGeneratorOptionsWithClient } from '../../comms/controller';

import { schema as pinGroupSchema, PinGroup } from '../../models/pin-group';
import { schema as pinSchema, Pin } from '../../models/pin';
import { schema as edgeSchema, Edge } from '../../models/edge';
import { schema as gridSchema, Grid } from '../../models/grid';
import { schema as deviceSchema, Device } from '../../models/device';
import { schema as deviceTypeSchema, DeviceType } from '../../models/device-type';
import { schema as measurementThresholdSchema, MeasurementThreshold } from '../../models/measurement-threshold';
import { schema as quantitySchema, Quantity } from '../../models/quantity';

interface Request {
  params: {
    hashId: string;
  };
}

interface Response {
  pinGroup: PinGroup;
  pins: {
    pin: Pin,
    grids: Grid[],
  }[];
  edges: Edge[];
  grids: Grid[];
  device: Device | null;
  deviceType: DeviceType | null;
  channelMapping: {
    channel: number;
    pinHashId: string | null;
  }[] | null;
  nextReportBefore: Date | null;
  thresholds: {
    value: MeasurementThreshold;
    quantity: Quantity;
  }[];
  photo: string | null;
}

const controllerGeneratorOptions: ControllerGeneratorOptionsWithClient = {
  method: 'get',
  path: '/pin-group/:hashId',
  params: Joi.object().keys({
    hashId: Joi.string().required().example('dao97'),
  }).required(),
  right: { environment: 'READ' },
  response: (apiVersion: number): Joi.ObjectSchema => Joi.object().keys({
    pinGroup: pinGroupSchema.required(),
    pins: Joi.array().items(Joi.object().keys({
      pin: pinSchema,
      grids: Joi.array().items(gridSchema),
    })).required(),
    edges: Joi.array().items(edgeSchema).required(),
    device: deviceSchema.allow(null).required(),
    deviceType: deviceTypeSchema(apiVersion).allow(null).required(),
    channelMapping: Joi.array().items(Joi.object().keys({
      channel: Joi.number().integer().required().example(0),
      pinHashId: Joi.string().allow(null).default(null),
    })).required().allow(null),
    measurementCycle: Joi.valid(null).default(null), // for legacy purposes only
    thresholds: Joi.array().items(Joi.object().keys({
      value: measurementThresholdSchema.required(),
      quantity: quantitySchema(apiVersion).required(),
    })).required(),
    photo: Joi.string().allow(null).required().description('download link for photo.')
      .example('https://api.withthegrid.com/file/yr969d...'),
    nextReportBefore: Joi.date().allow(null).required().example('2019-12-31T15:25Z'),
    grids: Joi.array().items(gridSchema).required(),
  }).required(),
  description: 'Get a specific pin group identified by its hashId',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
