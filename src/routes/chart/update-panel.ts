import Joi from 'joi';
import { ControllerGeneratorOptions } from '../../comms/controller';

interface Request {
  query: { pinGroupHashId: string }
  | { gridHashId: string }
  | { edgeHashId: string }
  | { pinHashId: string };
  body: {
    charts: {
      title: string | null;
      series: {
        quantityHashId: string;
        pinHashId: string;
        color: string;
      }[];
    }[];
  };
}

type Response = void;

const controllerGeneratorOptions: ControllerGeneratorOptions = {
  method: 'post',
  path: '/panel',
  query: Joi.alternatives().try(
    Joi.object().keys({ pinGroupHashId: Joi.string().required().example('dao97') }).required(),
    Joi.object().keys({ gridHashId: Joi.string().required().example('naud51') }).required(),
    Joi.object().keys({ edgeHashId: Joi.string().required().example('ka08d') }).required(),
    Joi.object().keys({ pinHashId: Joi.string().required().example('e13d57') }).required(),
  ).required(),
  body: Joi.object().keys({
    charts: Joi.array().items(Joi.object().keys({
      title: Joi.string().allow(null).example(null).required(),
      series: Joi.array().max(40).items(Joi.object().keys({
        quantityHashId: Joi.string().required().example('sajia1'),
        pinHashId: Joi.string().required().example('e13d57'),
        color: Joi.string().example('#ff0000').description('A hex color string').required(),
      })).required(),
    })).required(),
  }).required(),
  right: { environment: 'REPORTS' },
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};