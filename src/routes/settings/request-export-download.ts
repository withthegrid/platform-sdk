import Joi from '@hapi/joi';
import { ControllerGeneratorOptions } from '../../comms/controller';

interface Request {
  params: {
    hashId: string;
  };
}

interface Response {
  token: string;
}

const controllerGeneratorOptions: ControllerGeneratorOptions = {
  method: 'post',
  path: '/export/:hashId',
  params: Joi.object().keys({
    hashId: Joi.string().required().example('maay1'),
  }).required(),
  right: { environment: 'EXPORT' },
  response: Joi.object().keys({
    token: Joi.string().required().example('1as71562gg'),
  }).required(),
  description: 'Request a token to download a zip file containing a data export. Can only be done for export requests with status available',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
