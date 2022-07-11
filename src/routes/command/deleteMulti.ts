import Joi from 'joi';
import { ControllerGeneratorOptionsWithClientAndSupplier } from '../../comms/controller';

interface Request {
  body: {
    hashIds: string[];
  };
}

type ValidResponse = {
  hashId: string;
  deleted: true;
};

type ErrorResponse = {
  hashId: string;
  deleted: false;
  failureReason: string;
};

type Response = Array<ValidResponse | ErrorResponse>;

const validResponseSchema = Joi.object().keys({
  hashId: Joi.string().required().example('ga9741s'),
  deleted: Joi.boolean().default(true).disallow(false).example(true),
});

const errorResponseSchema = Joi.object().keys({
  hashId: Joi.string().required().example('ga9741s'),
  deleted: Joi.boolean().default(false).disallow(true).example(false),
  failureReason: Joi.string().example(
    'Device cannot be reached in time to cancel this command.',
  ),
});

const controllerGeneratorOptions: ControllerGeneratorOptionsWithClientAndSupplier = {
  method: 'delete',
  path: '/',
  body: Joi.object()
    .keys({
      hashIds: Joi.array()
        .items(Joi.string())
        .required()
        .example(['ga9741s']),
    })
    .required(),
  response: Joi.array().items(
    Joi.alternatives([validResponseSchema, errorResponseSchema]),
  ),
  right: { environment: 'SENSORS', supplier: 'ENVIRONMENT_ADMIN' },
  description:
      'Delete multiple commands. Will return an array showing which commands were deleted or not.',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
