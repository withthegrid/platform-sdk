import Joi from '@hapi/joi';
import { ControllerGeneratorOptions } from '../../comms/controller';

interface Request {
  body: {
    measurements: {
      pinHashId: string;
      quantityHashId: string;
      generatedAt: Date;
      orderOfMagnitude: number;
      significand: number;
    }[];
    reportTypeHashId: string;
    pinGroupHashId: string;
    fields?: Record<string, string>;
  };
}

interface Response {
  hashId: string;
}

const controllerGeneratorOptions: ControllerGeneratorOptions = {
  method: 'post',
  path: '/',
  body: Joi.object().keys({
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
    fields: Joi.object(),
  }).required(),
  right: 'REPORTS',
  response: Joi.object().keys({
    hashId: Joi.string().required().example('qoa978'),
  }).required(),
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
