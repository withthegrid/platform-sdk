import Joi from 'joi';
import { ControllerGeneratorOptions } from '../../comms/controller';

import { schema as measurementFilterSchema, MeasurementFilter } from '../../models/measurement-filter';
import { schema as environmentReportTypeSchema, EnvironmentReportType } from '../../models/environment-report-type';
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
  reportTypes: EnvironmentReportType[];
  grids: { grid: Grid; pinGroupHashIds: string[] }[];
  pinGroups: { pinGroup: PinGroup; explicit: boolean }[];
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
    reportTypes: Joi.array().items(environmentReportTypeSchema).required(),
    grids: Joi.array().items(Joi.object().keys({
      grid: gridSchema.required(),
      pinGroupHashIds: Joi.array().items(Joi.string().example('dao97')).required().description('A pinGroup can be part of multiple grids and can also be added explicitly as an individual pinGroup to this filter.'),
    })).required(),
    pinGroups: Joi.array().items(Joi.object().keys({
      pinGroup: pinGroupSchema(apiVersion).required(),
      explicit: Joi.boolean().required().example(true).description('If true, the pinGroup is added individually to the measurement filter, not (only) as part of a grid'),
    })).required(),
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
