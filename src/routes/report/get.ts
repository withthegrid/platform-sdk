import Joi from 'joi';
import { ControllerGeneratorOptions } from '../../comms/controller';

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

const controllerGeneratorOptions: ControllerGeneratorOptions = {
  method: 'get',
  path: '/:hashId',
  params: Joi.object().keys({
    hashId: Joi.string().required().example('qoa978'),
  }).required(),
  right: { environment: 'READ' },
  response: (apiVersion: number): Joi.ObjectSchema => {
    const base = Joi.object().keys({
      deviceHashId: Joi.string().allow(null).required().example('j1iha9'),
      userName: Joi.string().allow(null).required().example(null)
        .description('Is null for reports generated by a device'),
      generatedAt: Joi.date().allow(null).required().example('2019-12-31T15:23Z'),
      createdAt: Joi.date().required().example('2019-12-31T15:23Z'),
      deviceType: deviceTypeSchema.allow(null).required(),
      pinGroupHashId: Joi.string().allow(null).required().example('dao97'),
      hashId: Joi.string().required().example('qoa978'),
      fields: fieldsFromServerSchema.required().example({ id: 'My report' }),
      observations: Joi.array().items(Joi.object().keys({
        measurement: measurementSchema(apiVersion).required(),
        quantityHashId: Joi.string().required().example('sajia1'),
      })).required(),
      type: environmentReportTypeSchema.required(),
      quantities: Joi.array().items(quantitySchema).required(),
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
