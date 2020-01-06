import Joi from '@hapi/joi';
import { ControllerGeneratorOptions } from '../../comms/controller';

import { schema as releaseSchema, Release } from '../../models/release';


type Request = {};

type Response = Release[];


const controllerGeneratorOptions: ControllerGeneratorOptions = {
  method: 'get',
  path: '/releases',
  right: null,
  response: Joi.array().items(releaseSchema).required(),
  description: 'Get a list of recent changes to the platform',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
