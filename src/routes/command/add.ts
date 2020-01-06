import Joi from '@hapi/joi';
import { ControllerGeneratorOptions } from '../../comms/controller';


interface Request {
  body: {
    objectType: 'device' | 'pinGroup' | 'grid';
    instruction: string;
    objectHashIds: string[];
    settings: Record<string, any>;
    startAt?: Date | null;
    endAt?: Date | null;
    email: string[];
  };
}

type EffectiveRequest = {
  body: Required<Request['body']>;
}

type Response = void;

const controllerGeneratorOptions: ControllerGeneratorOptions = {
  method: 'post',
  path: '/',
  body: Joi.object().keys({
    objectType: Joi.string().valid('device', 'pinGroup', 'grid').required().example('device')
      .description('When grid is chosen, the command is sent to all devices connected to pinGroups in that grid'),
    objectHashIds: Joi.array().items(Joi.string().example('j1iha9')).min(1).required(),
    instruction: Joi.string().required().example('set-cycle'),
    settings: Joi.object().required().example({ interval: 86400, fixed: null }),
    startAt: Joi.date().allow(null).default(null).description('If null, is executed as soon as possible'),
    endAt: Joi.date().allow(null).default(null),
    email: Joi.array().items(Joi.string().email({ tlds: false })).required().example([])
      .description('An email will be sent to all provided email addresses when the command is executed by the sensor'),
  }).required(),
  right: 'SENSORS',
  description: 'Add a command that should be sent to a specific device',
};

export {
  controllerGeneratorOptions,
  Request,
  EffectiveRequest,
  Response,
};
