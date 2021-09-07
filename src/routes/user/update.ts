import Joi from 'joi';
import { ControllerGeneratorOptionsWithClientAndSupplier } from '../../comms/controller';

interface Request {
  params: {
    hashId: string;
  };
  body: {
    rights: string[];
  };
}

type Response = void;

const controllerGeneratorOptions: ControllerGeneratorOptionsWithClientAndSupplier = {
  method: 'post',
  path: '/:hashId',
  params: Joi.object().keys({
    hashId: Joi.string().required().example('b45zo0'),
  }).required(),
  body: Joi.object().keys({
    rights: Joi.array().items(Joi.string()).required().example(['STATIC', 'USERS'])
      .description('See the getting started section about rights'),
  }).required(),
  right: { environment: 'USERS', supplier: 'ENVIRONMENT_ADMIN' },
  description: 'Update the rights of a user for this monitoring environment or connectivity environment.',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
