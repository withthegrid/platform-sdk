import Joi from 'joi';
import { ControllerGeneratorOptions } from '../../comms/controller';

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
    gridHashIds?: string[];
    pinGroupHashIds?: string[];
    quantityHashIds?: string[];
    fieldKeys?: string[];
  };
}

type Response = void;

const controllerGeneratorOptions: ControllerGeneratorOptions = {
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
    gridHashIds: Joi.array().max(50).items(Joi.string()),
    pinGroupHashIds: Joi.array().max(50).items(Joi.string()),
    quantityHashIds: Joi.array().max(20).items(Joi.string()),
    fieldKeys: Joi.array().max(20).items(Joi.string()),
  }).required(),
  right: { environment: 'REPORTS' },
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
