import Joi from 'joi';
import { ControllerGeneratorOptionsWithClient } from '../../comms/controller';

type HashId = string;
type Request = {
  params: {
    hashId: HashId
  }
}
type EffectiveRequest = Request;
type Response = void;

const controllerGeneratorOptions: ControllerGeneratorOptionsWithClient = {
  method: 'delete',
  path: '/:hashId',
  params: Joi.object().keys({
    hashId: Joi.string().required().example('xd2rd4'),
  }).required(),
  right: { environment: 'ENVIRONMENT_ADMIN' },
  description: 'Deletes an existing issue trigger rule override',
};

export {
  controllerGeneratorOptions,
  Request,
  EffectiveRequest,
  Response,
};
