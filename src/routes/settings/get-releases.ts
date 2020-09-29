import Joi from 'joi';
import { ControllerGeneratorOptions } from '../../comms/controller';

import { schema as releaseSchema, Release } from '../../models/release';

type Request = Record<string, undefined> | undefined;
type EffectiveRequest = Record<string, undefined>;

type Response = Release[];

const controllerGeneratorOptions: ControllerGeneratorOptions = {
  method: 'get',
  path: '/releases',
  right: {},
  response: Joi.array().items(releaseSchema).required(),
  description: 'Get a list of recent changes to the application',
};

export {
  controllerGeneratorOptions,
  Request,
  EffectiveRequest,
  Response,
};
