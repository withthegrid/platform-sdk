import Joi from 'joi';
import { ControllerGeneratorOptionsWithClientAndSupplier } from '../../comms/controller';

interface Request {
  body: {
    hashIds: string[];
  };
}

type Response = Array<{
  hashId: string,
  deleted: boolean
  reason?: string,
}>;

const controllerGeneratorOptions: ControllerGeneratorOptionsWithClientAndSupplier = {
  method: 'delete',
  path: '/',
  body: Joi.object().keys({
    hashIds: Joi.array().items(Joi.string()).required().example(['ga9741s']),
  }).required(),
  response: Joi.array().items(Joi.object().keys({
    hashId: Joi.string().required().example('ga9741s'),
    deleted: Joi.boolean().required().example(false),
    reason: Joi.string().example('Device cannot be reached in time to cancel this command.'),
  })),
  right: { environment: 'SENSORS', supplier: 'ENVIRONMENT_ADMIN' },
  description: 'Delete multiple commands. Will return an array showing which commands were deleted or not.',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
