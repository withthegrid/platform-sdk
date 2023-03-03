import Joi from 'joi';
import { ControllerGeneratorOptionsWithoutClientOrSupplier } from '../../comms/controller';

import { schema as userEnvironmentSettingsSchema, UserEnvironmentSettings } from '../../models/user-environment-settings';
import { schema as environmentSchema, Environment } from '../../models/environment';

interface Request {
  params: {
    hashId: string;
  };
}

interface Response {
  environment: Environment;
  environmentRights: string[];
  userEnvironmentSettings: UserEnvironmentSettings;
  environmentLogo: string | null;
}

const controllerGeneratorOptions: ControllerGeneratorOptionsWithoutClientOrSupplier = {
  method: 'get',
  path: '/:hashId',
  params: Joi.object().keys({
    hashId: Joi.string().required().example('f1a4w1'),
  }).required(),
  right: {}, // environmentHashId in header is irrelevant
  response: (apiVersion: number): Joi.ObjectSchema => Joi.object().keys({
    environment: environmentSchema(apiVersion).required(),
    environmentRights: Joi.array().items(Joi.string()).required().example(['STATIC', 'USERS'])
      .description('See the getting started section about rights'),
    userEnvironmentSettings: userEnvironmentSettingsSchema.required(),
    environmentLogo: Joi.string().allow(null).required().description('download link for photo.')
      .example('https://api.withthegrid.com/file/yr969d...'),
  }).required(),
  description: 'Get a specific monitoring environment identified by its hashId',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
