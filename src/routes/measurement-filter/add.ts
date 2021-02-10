import Joi from 'joi';
import { ControllerGeneratorOptions } from '../../comms/controller';

interface Request {
  body: {
    name: string;
    description: string;
    period: 'lastMonth' | 'lastQuarter' | 'lastYear' | {
      since?: Date; // including
      before?: Date; // not including
    };
    includePinsWithoutReports: boolean;
    reportTypeHashIds: string[];
    gridHashId?: string;
    pinGroupHashIds?: string[];
    quantityHashIds: string[];
    fieldKeys: string[];
  }
}

interface Response {
  hashId: string;
}

const controllerGeneratorOptions: ControllerGeneratorOptions = {
  method: 'post',
  path: '/',
  body: Joi.object().keys({
    name: Joi.string().required().example('North'),
    description: Joi.string().required().allow('').example('Temperatures in the North'),
    period: Joi.alternatives().try(
      Joi.string().valid('lastMonth', 'lastQuarter', 'lastYear').required().example('lastMonth'),
      Joi.object().keys({
        since: Joi.date(),
        before: Joi.date().example('2019-12-31T15:23Z'),
      }).required(),
    ).required(),
    includePinsWithoutReports: Joi.boolean().default(true),
    reportTypeHashIds: Joi.array().max(20).items(Joi.string().example('naud51'))
      .required(),
    gridHashId: Joi.string(),
    pinGroupHashIds: Joi.array().min(1).max(50).items(Joi.string().example('dao97')),
    quantityHashIds: Joi.array().max(64).items(Joi.string().example('sajia1'))
      .required(),
    fieldKeys: Joi.array().max(20).items(Joi.string().example('id')).required(),
  }).required(),
  right: { environment: 'REPORTS' },
  response: Joi.object().keys({
    hashId: Joi.string().required().example('k8gh3'),
  }).required(),
  description: 'Add a measurement filter',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
