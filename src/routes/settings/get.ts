import Joi from 'joi';
import { ControllerGeneratorOptionsWithoutClientOrSupplier } from '../../comms/controller';

import { schema as userEnvironmentSettingsSchema, UserEnvironmentSettings } from '../../models/user-environment-settings';
import { schema as environmentSchema, Environment } from '../../models/environment';
import { schema as userSchema, User } from '../../models/user';

type Request = Record<string, undefined> | undefined;
type EffectiveRequest = Record<string, undefined>;

interface Response {
  environment?: Environment;
  environmentRights?: string[];
  userEnvironmentSettings?: UserEnvironmentSettings,
  user: User;
  environmentLogo?: string | null;
}

const controllerGeneratorOptions: ControllerGeneratorOptionsWithoutClientOrSupplier = {
  method: 'get',
  path: '/',
  right: {},
  response: (apiVersion: number): Joi.ObjectSchema => Joi.object().keys({
    environment: environmentSchema(apiVersion).description('A random monitoring environment this user has access to'),
    environmentRights: Joi.array().items(Joi.string()).example(['STATIC', 'USERS'])
      .description('See the getting started section about rights'),
    userEnvironmentSettings: userEnvironmentSettingsSchema,
    user: userSchema.required(),
    environmentLogo: Joi.string().allow(null).description('download link for photo.')
      .example('https://api.withthegrid.com/file/yr969d...'),
  }).required(),
  description: 'Get information about the logged in user',
};

export {
  controllerGeneratorOptions,
  Request,
  EffectiveRequest,
  Response,
};
