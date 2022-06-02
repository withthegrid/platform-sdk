import Joi from 'joi';
import { ControllerGeneratorOptionsWithClient } from '../../comms/controller';

import { schema as measurementSchema, Measurement } from '../../models/measurement';
import { schema as quantitySchema, Quantity } from '../../models/quantity';
import { schema as environmentReportTypeSchema, EnvironmentReportType } from '../../models/environment-report-type';
import { schema as fieldsFromServerSchema, FieldsFromServer } from '../../models/fields/fields-from-server';
import { schema as deviceTypeSchema, DeviceType } from '../../models/device-type';

interface Request {
  params: {
    hashId: string;
  };
}

interface Response {
  hashId: string;
  observations: {
    measurement: Measurement;
    quantityHashId: string;
  }[];
  deviceType: DeviceType | null;
  deviceHashId: string | null;
  fields: FieldsFromServer;
  type: EnvironmentReportType;
  quantities: Quantity[];
  pinGroupHashId: string | null;
  userName: string | null;
  generatedAt: Date | null;
  createdAt: Date;
}

const controllerGeneratorOptions: ControllerGeneratorOptionsWithClient = {
  method: 'get',
  path: '/:hashId',
  params: Joi.object().keys({
    hashId: Joi.string().required().example('qoa978'),
  }).required(),
  right: { environment: 'READ' },
  response: (apiVersion: number): Joi.ObjectSchema => {
    const base = Joi.object().keys({
      hashId: Joi.string().required().example('qoa978'),
      observations: Joi.array().items(Joi.object().keys({
        measurement: measurementSchema(apiVersion).required(),
        quantityHashId: Joi.string().required().example('sajia1'),
      })).required(),
      deviceType: deviceTypeSchema(apiVersion).allow(null).required(),
      deviceHashId: Joi.string().allow(null).required().example('j1iha9'),
      fields: fieldsFromServerSchema.required().example({ id: 'My report' }),
      type: environmentReportTypeSchema(apiVersion).required(),
      quantities: Joi.array().items(quantitySchema(apiVersion)).required()
        .description('Only includes the quantities used in the report, not the quantities that are available in the report type (only relevant for report types of type human)'),
      pinGroupHashId: Joi.string().allow(null).required().example('dao97'),
      userName: Joi.string().allow(null).required().example(null)
        .description('Is null for reports generated by a device'),
      generatedAt: Joi.date().allow(null).required().example('2019-12-31T15:23Z'),
      createdAt: Joi.date().required().example('2019-12-31T15:23Z'),
    }).required();

    return base;
  },
  description: 'Get a specific report identified by its hashId',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
