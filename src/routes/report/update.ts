import Joi from 'joi';
import { ControllerGeneratorOptionsWithClient } from '../../comms/controller';
import { schema as fieldsFromServerSchema, FieldsFromServer } from '../../models/fields/fields-from-server';
import {
  schema as fieldsToServerUpdateSchema, FieldsToServerUpdate,
} from '../../models/fields/fields-to-server-update';

interface NewMeasurement {
  pinHashId: string;
  quantityHashId: string;
  generatedAt: Date;
  orderOfMagnitude: number;
  significand: number;
  doNotCompareToThresholds: boolean;
}

interface UpdatedMeasurement {
  measurementHashId: string;
  generatedAt: Date;
  orderOfMagnitude: number;
  significand: number;
  doNotCompareToThresholds: boolean;
}

type ReportUpdate = UpdatedMeasurement | NewMeasurement;

interface Request {
  params: {
    hashId: string;
  };
  body: {
    generatedAt?: Date;
    fields?: FieldsToServerUpdate;
    measurements: ReportUpdate[];
  };
}

type Response = {
  fields: FieldsFromServer;
};

const controllerGeneratorOptions: ControllerGeneratorOptionsWithClient = {
  method: 'post',
  path: '/:hashId',
  params: Joi.object().keys({
    hashId: Joi.string().required().example('qoa978'),
  }).required(),
  body: Joi.object().keys({
    generatedAt: Joi.date().example('2019-12-31T15:23Z').description('The timestamp of the report itself. If not provided, the timestamp of the most recent measurement is taken. If no measurements are present, the existing generatedAt of the report is used.'),
    measurements: Joi.array().items(Joi.alternatives().try(
      Joi.object().keys({
        measurementHashId: Joi.string().required().example('po177'),
        generatedAt: Joi.date().required().example('2019-12-31T15:23Z'),
        orderOfMagnitude: Joi.number().integer().min(-128).max(127)
          .required()
          .example(-3)
          .description('The measured value is significand * 10 ^ orderOfMagnitude. It has as many significant figures as the significand has (except when the significand is 0, then the number of significant figures is not defined)'),
        significand: Joi.number().integer().min(-2147483648).max(2147483647)
          .required()
          .example(-1400)
          .description('The measured value is significand * 10 ^ orderOfMagnitude. It has as many significant figures as the significand has (except when the significand is 0, then the number of significant figures is not defined)'),
        doNotCompareToThresholds: Joi.boolean().default(false)
          .example(true)
          .description('Do not compare to thresholds'),
      }),
      Joi.object().keys({
        pinHashId: Joi.string().required().example('e13d57'),
        quantityHashId: Joi.string().required(),
        generatedAt: Joi.date().required(),
        orderOfMagnitude: Joi.number().integer().min(-128).max(127)
          .required()
          .description('The measured value is significand * 10 ^ orderOfMagnitude. It has as many significant figures as the significand has (except when the significand is 0, then the number of significant figures is not defined)'),
        significand: Joi.number().integer().min(-2147483648).max(2147483647)
          .required()
          .description('The measured value is significand * 10 ^ orderOfMagnitude. It has as many significant figures as the significand has (except when the significand is 0, then the number of significant figures is not defined)'),
        doNotCompareToThresholds: Joi.boolean().default(false)
          .example(true)
          .description('Do not compare to thresholds'),
      }),
    )).required(),
    fields: fieldsToServerUpdateSchema,
  }).required(),
  right: { environment: 'REPORTS' },
  response: Joi.object().keys({
    fields: fieldsFromServerSchema.required().example({ id: 'My report' }),
  }).required(),
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
  NewMeasurement,
  UpdatedMeasurement,
};
