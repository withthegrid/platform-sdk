import Joi from 'joi';
import { ControllerGeneratorOptionsWithoutClientOrSupplier } from '../../comms/controller';

interface Request {
  body: {
    theme: string;
    feedback: string;
  };
}

type Response = void;

const controllerGeneratorOptions: ControllerGeneratorOptionsWithoutClientOrSupplier = {
  method: 'post',
  path: '/',
  right: {},
  body: Joi.object().keys({
    theme: Joi.string().example('Email theme'),
    feedback: Joi.string().required().example('Text with feedback about withthegrid'),
  }).required(),
  description: 'Send email with feedback',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
