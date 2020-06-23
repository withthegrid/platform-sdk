import Joi from '@hapi/joi';
import { ControllerGeneratorOptions } from '../../comms/controller';
import {
  fieldsToServerFullSchema, FieldsToServerFull, fieldsFromServerSchema, FieldsFromServer,
} from '../../models/field-configuration';

interface Request {
  body: {
    generatedAt?: Date;
    measurements: {
      pinHashId: string;
      quantityHashId: string;
      generatedAt: Date;
      orderOfMagnitude: number;
      significand: number;
    }[];
    reportTypeHashId: string;
    pinGroupHashId: string;
    fields?: FieldsToServerFull;
  };
}

interface Response {
  hashId: string;
  fields: FieldsFromServer;
}

const controllerGeneratorOptions: ControllerGeneratorOptions = {
  method: 'post',
  path: '/',
  body: Joi.object().keys({
    generatedAt: Joi.date().example('2019-12-31T15:23Z').description('The timestamp of the report itself. If not provided, the timestamp of the most recent measurement is taken. If no measurements are present, the existing generatedAt of the report is used.'),
    measurements: Joi.array().items(Joi.object().keys({
      pinHashId: Joi.string().required().example('e13d57'),
      quantityHashId: Joi.string().required().example('sajia1'),
      generatedAt: Joi.date().required().example('2019-12-31T15:23Z'),
      orderOfMagnitude: Joi.number().integer().min(-128).max(127)
        .required()
        .example(-3)
        .description('The measured value is significand * 10 ^ orderOfMagnitude. It has as many significant figures as the significand has (except when the significand is 0, then the number of significant figures is not defined)'),
      significand: Joi.number().integer().min(-2147483648).max(2147483647)
        .required()
        .example(-1500)
        .description('The measured value is significand * 10 ^ orderOfMagnitude. It has as many significant figures as the significand has (except when the significand is 0, then the number of significant figures is not defined)'),
    })).required(),
    reportTypeHashId: Joi.string().required().example('l19a7s'),
    pinGroupHashId: Joi.string().required().example('dao97'),
    fields: fieldsToServerFullSchema,
  }).required(),
  right: { environment: 'REPORTS' },
  response: Joi.object().keys({
    hashId: Joi.string().required().example('qoa978'),
    fields: fieldsFromServerSchema.required().example({ id: 'My report' }),
  }).required(),
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
