import Joi from 'joi';
import { ControllerGeneratorOptionsWithClient } from '../../comms/controller';

interface Request {
  params: {
    pinHashId: string,
    quantityHashId: string,

  };
  query: {
    generatedAt: Date
  };
}

interface Response {
  hashId: string;
}

const controllerGeneratorOptions: ControllerGeneratorOptionsWithClient = {
  method: 'get',
  path: '/:pinHashId/:quantityHashId/',
  params: Joi.object().keys({
    pinHashId: Joi.string().required().example('e13d57'),
    quantityHashId: Joi.string().required().example('sajia1'),
  }).required(),
  query: Joi.object().keys({
    generatedAt: Joi.date().iso().required().example('2019-12-01T00:00Z'),
  }).required(),
  right: { environment: 'READ' },
  response: Joi.object().keys({
    hashId: Joi.string().required().example('qoa978'),
  }),
  description: 'Get a specific report identified by the data of a single time-series point',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
