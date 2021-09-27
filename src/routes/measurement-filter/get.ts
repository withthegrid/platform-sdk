import Joi from 'joi';
import { ControllerGeneratorOptionsWithClient } from '../../comms/controller';

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
  grid: Grid | null;
  pinGroups: PinGroup[];
  quantities: Quantity[];
  fieldKeys: string[];
  pinFieldKeys: string[];
  edgeFieldKeys: string[];
}

const controllerGeneratorOptions: ControllerGeneratorOptionsWithClient = {
  method: 'get',
  path: '/:hashId',
  params: Joi.object().keys({
    hashId: Joi.string().required().example('k8gh3'),
  }).required(),
  right: { environment: 'READ' },
  response: (apiVersion: number): Joi.ObjectSchema => Joi.object().keys({
    measurementFilter: measurementFilterSchema.required(),
    reportTypes: Joi.array().items(environmentReportTypeSchema).required(),
    grid: gridSchema.allow(null).required(),
    pinGroups: Joi.array().items(pinGroupSchema(apiVersion)).required(),
    quantities: Joi.array().items(quantitySchema).required(),
    fieldKeys: Joi.array().items(Joi.string().example('id')).required(),
    pinFieldKeys: Joi.array().items(Joi.string().example('id')).required(),
    edgeFieldKeys: Joi.array().items(Joi.string().example('id')).required(),
  }).required(),
  description: 'Get a specific measurement filter identified by its hashId',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
