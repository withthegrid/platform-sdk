import Joi from 'joi';
import { ControllerGeneratorOptions } from '../../comms/controller';

import { schema as measurementFilterSchema, MeasurementFilter } from '../../models/measurement-filter';
import { schema as gridSchema, Grid } from '../../models/grid';
import { schema as pinGroupSchema, PinGroup } from '../../models/pin-group';
import { schema as quantitySchema, Quantity } from '../../models/quantity';

interface Request {
  params: {
    hashId: string;
  };
}

interface Response {
  measurementFilter: MeasurementFilter;
  grids: Grid[];
  pinGroups: PinGroup[];
  quantities: Quantity[];
  fieldKeys: string[];
}

const controllerGeneratorOptions: ControllerGeneratorOptions = {
  method: 'get',
  path: '/:hashId',
  params: Joi.object().keys({
    hashId: Joi.string().required().example('k8gh3'),
  }).required(),
  right: { environment: 'READ' },
  response: (apiVersion: number): Joi.ObjectSchema => Joi.object().keys({
    measurementFilter: measurementFilterSchema.required(),
    grids: Joi.array().items(gridSchema).required(),
    pinGroups: Joi.array().items(pinGroupSchema(apiVersion)).required(),
    quantities: Joi.array().items(quantitySchema).required(),
    fieldKeys: Joi.array().items(Joi.string()).required(),
  }).required(),
  description: 'Get a specific measurement filter identified by its hashId',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
