import Joi from 'joi';
import { ControllerGeneratorOptionsWithClient } from '../../comms/controller';

type Request = {
  params: {
    hashId: string;
  };
}

type Response = {
  hashId: string;
  name: string;
  color: string;
}

const controllerGeneratorOptions: ControllerGeneratorOptionsWithClient = {
  method: 'get',
  path: '/:hashId',
  params: Joi.object().keys({
    hashId: Joi.string().required().example('xd2rd4'),
  }).required(),
  right: { environment: 'READ' },
  response: Joi.object().keys({
    hashId: Joi.string().required().example('xd2rd4'),
    name: Joi.string().required().example('My label'),
    color: Joi.string().pattern(/^#[a-fA-F\d]{6}$/).required().description('#, followed by six hexadecimal characters')
      .example('#ff0000'),
  }),
};

export {
  controllerGeneratorOptions,
  Request,
  Response,
  Request as EffectiveRequest,
};
