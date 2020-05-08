import Joi from '@hapi/joi';
import { ControllerGeneratorOptions } from '../../comms/controller';

interface Request {
  body: {
    name: string;
    color: string;
  };
}

interface Response {
  hashId: string;
}

const controllerGeneratorOptions: ControllerGeneratorOptions = {
  method: 'post',
  path: '/',
  body: Joi.object().keys({
    name: Joi.string().required().example('Fix this month'),
    color: Joi.string().pattern(/^#[a-fA-F\d]{6}$/).required().description('#, followed by six hexadecimal characters')
      .example('#ff0000'),
  }).required(),
  right: { environment: 'ISSUES' },
  response: Joi.object().keys({
    hashId: Joi.string().required().example('u98a24'),
  }).required(),
  description: 'Create a label',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
