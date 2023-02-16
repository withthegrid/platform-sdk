import Joi from 'joi';
import { ControllerGeneratorOptionsWithoutClientOrSupplier } from '../../comms/controller';

interface Request {
  body: {
    theme?: string;
    feedback: string;
  };
}

type Response = void;

const controllerGeneratorOptions: ControllerGeneratorOptionsWithoutClientOrSupplier = {
  method: 'post',
  path: '/feedback',
  right: {},
  body: Joi.object().keys({
    theme: Joi.string().allow(null).example('Email theme').max(255),
    feedback: Joi.string().required().example('Text with feedback about withthegrid').max(1000),
  }).required(),
  description: 'Send email with feedback',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
