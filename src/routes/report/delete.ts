import Joi from 'joi';
import { ControllerGeneratorOptionsWithClient } from '../../comms/controller';

interface Request {
  params: {
    hashId: string;
  };
}

type Response = void;

const controllerGeneratorOptions: ControllerGeneratorOptionsWithClient = {
  method: 'delete',
  path: '/:hashId',
  params: Joi.object().keys({
    hashId: Joi.string().required().example('qoa978'),
  }).required(),
  right: { environment: 'REPORTS' },
  description: 'Delete a report.',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
