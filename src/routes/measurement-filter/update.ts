import Joi from 'joi';
import { ControllerGeneratorOptionsWithClient } from '../../comms/controller';

interface Request {
  params: {
    hashId: string;
  };
  body: {
    name?: string;
    description?: string;
    period?: 'lastMonth' | 'lastQuarter' | 'lastYear' | {
      since?: Date; // including
      before?: Date; // not including
    };
    includePinsWithoutReports?: boolean;
    reportTypeHashIds?: string[];
    gridHashId?: string;
    pinGroupHashIds?: string[]; // max 50
    quantityHashIds?: string[];
    fieldKeys?: string[];
    pinFieldKeys?: string[];
    edgeFieldKeys?: string[];
  };
}

type Response = void;

const controllerGeneratorOptions: ControllerGeneratorOptionsWithClient = {
  method: 'post',
  path: '/:hashId',
  params: Joi.object().keys({
    hashId: Joi.string().required().example('k8gh3'),
  }).required(),
  body: Joi.object().keys({
    name: Joi.string().example('South'),
    description: Joi.string().allow(''),
    period: Joi.alternatives().try(
      Joi.string().valid('lastMonth', 'lastQuarter', 'lastYear').required(),
      Joi.object().keys({
        since: Joi.date(),
        before: Joi.date().example('2019-12-31T15:23Z'),
      }).required(),
    ),
    includePinsWithoutReports: Joi.boolean(),
    reportTypeHashIds: Joi.array().max(20).items(Joi.string()),
    gridHashId: Joi.string(),
    pinGroupHashIds: Joi.array().min(1).max(50).items(Joi.string().example('dao97')),
    quantityHashIds: Joi.array().min(1).max(64).items(Joi.string()),
    fieldKeys: Joi.array().max(20).items(Joi.string()),
    pinFieldKeys: Joi.array().items(Joi.string()),
    edgeFieldKeys: Joi.array().items(Joi.string()),
  }).required(),
  right: { environment: 'REPORTS' },
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
