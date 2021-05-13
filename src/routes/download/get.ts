import Joi from 'joi';
import { ControllerGeneratorOptionsWithoutClientOrSupplier } from '../../comms/controller';

interface Request {
  params: {
    hashId: string;
  };
  query: {
    token: string;
  };
}

type Response = void;

const controllerGeneratorOptions: ControllerGeneratorOptionsWithoutClientOrSupplier = {
  method: 'get',
  path: '/:hashId',
  right: {},
  params: Joi.object().keys({
    hashId: Joi.string().required().example('maay1'),
  }).required(),
  query: Joi.object().keys({
    token: Joi.string().required().example('1as71562gg').description('Is acquired with the settings.requestExportDownload controller'),
  }).required(),
  description: 'Get a specific export zip file. Its response will have Content-type application/zip',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
