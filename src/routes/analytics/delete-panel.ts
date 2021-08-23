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
  path: '/panel/:hashId',
  params: Joi.object().keys({
    hashId: Joi.string().required().example('7usgt'),
  }).required(),
  right: { environment: 'REPORTS' },
  description: 'Delete an analytics dashboard.',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
