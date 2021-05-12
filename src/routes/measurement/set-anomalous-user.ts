import Joi from 'joi';
import { ControllerGeneratorOptionsWithClient } from '../../comms/controller';

interface Request {
  params: {
    hashId: string;
  };
  body: {
    anomalousUser: boolean;
  };
}

type Response = void;

const controllerGeneratorOptions: ControllerGeneratorOptionsWithClient = {
  method: 'post',
  path: '/:hashId/anomalousUser',
  params: Joi.object().keys({
    hashId: Joi.string().required().example('qoa978'),
  }).required(),
  body: Joi.object().keys({
    anomalousUser: Joi.boolean(),
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
