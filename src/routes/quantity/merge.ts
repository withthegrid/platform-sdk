import Joi from 'joi';
import { ControllerGeneratorOptionsWithClientAndSupplier } from '../../comms/controller';

interface Request {
  body: {
    targetQuantityHashId: string;
  };
}

interface Response {
  hashId: string;
}

const controllerGeneratorOptions: ControllerGeneratorOptionsWithClientAndSupplier = {
  method: 'post',
  path: '/:sourceQuantityHashId/merge',
  params: Joi.object().keys({
    sourceQuantityHashId: Joi.string().required().example('sajia1'),
  }).required(),
  body: Joi.object().keys({
    targetQuantityHashId: Joi.string().required().example('sajia1'),
  }).required(),
  right: { environment: 'ENVIRONMENT_ADMIN', supplier: 'ENVIRONMENT_ADMIN' },
  description: 'Put all measurements of the source quantity on the target quantity (asynchronously) and remove the source quantity (synchronously). This cannot be reverted!',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
