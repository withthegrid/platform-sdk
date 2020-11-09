import Joi from 'joi';
import { ControllerGeneratorOptions } from '../../comms/controller';

interface Request {
  params: {
    hashId: string;
  };
  body: {
    anomalousUser: 0 | 1 | null;
    clientHashId: string;
  };
}

type Response = void;

const controllerGeneratorOptions: ControllerGeneratorOptions = {
  method: 'post',
  path: '/:hashId/anomalousUser',
  params: Joi.object().keys({
    hashId: Joi.string().required().example('qoa978'),
  }).required(),
  body: Joi.object().keys({
    anomalousUser: Joi.number().integer().valid(0, 1, null),
    clientHashId: Joi.string().required().example('qoa978'),
  }).required(),
  right: { environment: 'REPORTS' },
  description: 'Set/update anomalousUser in the dataset.',
};

export {
  Request,
  Request as EffectiveRequest,
  Response,
  controllerGeneratorOptions,
};
