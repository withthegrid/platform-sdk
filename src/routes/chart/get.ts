import Joi from 'joi';
import { ControllerGeneratorOptionsWithClient } from '../../comms/controller';

interface Request {
  query: {
    startAt: Date;
    endAt: Date;
    highResolution: boolean;
    series: {
      quantityHashId: string;
      pinHashId: string;
    }[]
  };
}

interface Response {
  series: {
    pinHashId: string;
    quantityHashId: string;
    linkHashId: string;
    measurementsSummary: {time: Date, value: number}[];
  }[];
}

const controllerGeneratorOptions: ControllerGeneratorOptionsWithClient = {
  method: 'get',
  path: '/',
  right: { environment: 'READ' },
  query: Joi.object().keys({
    startAt: Joi.date().required().example('2019-12-31T15:23Z'),
    endAt: Joi.date().required().example('2021-01-01T00:00Z').description('Up to not including'),
    series: Joi.array().max(40).items(Joi.object().keys({
      pinHashId: Joi.string().required().example('e13d57'),
      quantityHashId: Joi.string().required().example('sajia1'),
    })).required(),
    highResolution: Joi.boolean().default(false),
  }).required(),
  response: Joi.object().keys({
    series: Joi.array().items(Joi.object().keys({
      pinHashId: Joi.string().required().example('e13d57'),
      quantityHashId: Joi.string().required().example('sajia1'),
      linkHashId: Joi.string().required().example('po177'),
      measurementsSummary: Joi.array().items({
        time: Joi.date().required().example('2019-12-31T15:23Z'),
        value: Joi.number().required().example(0.5),
      }).required(),
    })).required(),
  }).required(),
  description: 'Get the measurement data for one or more time series for a specified period',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
