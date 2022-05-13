import Joi from 'joi';
import { ControllerGeneratorOptions } from '../../comms/controller';

interface Request {
  query: {
    email: string;
  };
}

type Response = void;

const controllerGeneratorOptions: ControllerGeneratorOptions = {
  method: 'post',
  path: '/remove-secret',
  query: Joi.object().keys({
    email: Joi.string().required(),
  }).required(),
  right: {},
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
