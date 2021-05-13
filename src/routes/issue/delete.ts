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
    hashId: Joi.string().required().example('c19aid'),
  }).required(),
  right: { environment: 'ISSUES' },
  description: 'Delete an issue.',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
