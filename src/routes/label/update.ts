import Joi from 'joi';
import { ControllerGeneratorOptionsWithClient } from '../../comms/controller';

interface Request {
  params: {
    hashId: string;
  };
  body: {
    name?: string;
    color?: string;
  };
}

type Response = void;

const controllerGeneratorOptions: ControllerGeneratorOptionsWithClient = {
  method: 'post',
  path: '/:hashId',
  params: Joi.object().keys({
    hashId: Joi.string().required().example('u98a24'),
  }).required(),
  body: Joi.object().keys({
    name: Joi.string(),
    color: Joi.string().pattern(/^#[a-fA-F\d]{6}$/).description('#, followed by six hexadecimal characters'),
  }).required(),
  right: { environment: 'ISSUES' },
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
