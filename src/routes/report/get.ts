import Joi from '@hapi/joi';
import { ControllerGeneratorOptions } from '../../comms/controller';

import { schema as measurementSchema, Measurement, MeasurementV1 } from '../../models/measurement';
import { schema as quantitySchema, Quantity } from '../../models/quantity';
import { schema as reportTypeSchema, ReportType } from '../../models/report-type';
import { schema as supplierReportTypeSchema, SupplierReportType } from '../../models/supplier-report-type';
import { fieldsSchema, Fields } from '../../models/field-configuration';

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
  deviceTypeKey: string | null;
  deviceHashId: string | null;
  fields: Fields;
  type: ReportType | SupplierReportType;
  quantities: Quantity[];
  pinGroupHashId: string | null;
  userName: string | null;
  generatedAt: Date | null;
  createdAt: Date;
}

type ResponsesIncludingDeprecated = Response | {
  deviceTypeKey: string | null;
  deviceHashId: string | null;
  nodeGroupHashId: string | null;
  userName: string | null;
  generatedAt: Date | null;
  createdAt: Date;
  measurements: MeasurementV1[];
  createdByDevice: boolean;
  typeKey: string;
  version: number;
  name: string;
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
      deviceTypeKey: Joi.string().allow(null).required().example('cp-pole'),
      deviceHashId: Joi.string().allow(null).required().example('j1iha9'),
      userName: Joi.string().allow(null).required().example(null)
        .description('Is null for sensor generated reports'),
      generatedAt: Joi.date().allow(null).required().example('2019-12-31T15:23Z'),
      createdAt: Joi.date().required().example('2019-12-31T15:23Z'),
    }).required();

    if (apiVersion <= 1) {
      return base.keys({
        nodeGroupHashId: Joi.string().allow(null).required().example('dao97'),
        measurements: Joi.array().items(measurementSchema(apiVersion)).required(),
        createdByDevice: Joi.boolean().required().example(true),
        typeKey: Joi.string().required().example('cp-pole'),
        version: Joi.number().integer().required().example(1),
        name: Joi.string().required().example('default'),
      });
    }
    return base.keys({
      pinGroupHashId: Joi.string().allow(null).required().example('dao97'),
      hashId: Joi.string().required().example('qoa978'),
      fields: fieldsSchema.required().example({ id: 'My report' }),
      observations: Joi.array().items(Joi.object().keys({
        measurement: measurementSchema(apiVersion).required(),
        quantityHashId: Joi.string().required().example('sajia1'),
      })).required(),
      type: Joi.alternatives().try(reportTypeSchema, supplierReportTypeSchema).required(),
      quantities: Joi.array().items(quantitySchema).required(),
    });
  },
  description: 'Get a specific report identified by its hashId',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
  ResponsesIncludingDeprecated,
};
