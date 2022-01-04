import Joi from 'joi';
import { ControllerGeneratorOptionsWithClient } from '../../comms/controller';

interface Request {
  query: {
    search: string;
    type: string;
    offset?: string;
    limit?: number;
  };
}

type EffectiveRequest = {
  query: Required<Request['query']>;
}

interface Response {
  results: string[];
}

const controllerGeneratorOptions: ControllerGeneratorOptionsWithClient = {
  method: 'get',
  path: '/suggestions',
  query: Joi.object().keys({
    search: Joi.string().required().example('%v1.1.0%'),
    type: Joi.string().required().example('issue.title'),
    offset: Joi.string().example('Installed v1.1.0-rc3'),
    limit: Joi.number().example(100),
  }).default(),
  right: { environment: 'READ' },
  response: Joi.object().keys({
    results: Joi.array().items(Joi.string()).required(),
  }).required(),
  description: 'Get suggestions for field of type, filtered by search',
};

export {
  controllerGeneratorOptions,
  Request,
  EffectiveRequest,
  Response,
};
