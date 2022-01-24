import Joi from 'joi';
import { ControllerGeneratorOptionsWithSupplier } from '../../comms/controller';
import { schema as baseFieldConfigurationSchema, BaseFieldConfiguration } from '../../models/fields/base-field-configuration';

interface Request {
  body: {
    name: string;
    fieldConfigurations: {
      pinGroup: BaseFieldConfiguration[];
      pin: BaseFieldConfiguration[];
      measurement: BaseFieldConfiguration[];
    };
    parser: string;
  };
}

interface Response {
  hashId: string;
  subscriptionHashId?: string;
}

const controllerGeneratorOptions: ControllerGeneratorOptionsWithSupplier = {
  method: 'post',
  path: '/',
  body: (apiVersion: number): Joi.ObjectSchema => Joi.object().keys({
    name: Joi.string().required().example('Temperature'),
    fieldConfigurations: Joi.object().keys({
      pinGroup: Joi.array().items(baseFieldConfigurationSchema(apiVersion)).required(),
      pin: Joi.array().items(baseFieldConfigurationSchema(apiVersion)).required(),
      measurement: Joi.array().items(baseFieldConfigurationSchema(apiVersion)).required(),
    }).required()
      .description('See the chapter on open fields on how to use this'),
    parser: Joi.string().required().example('[omitted]').description('A javascript function that parses an incoming report. See the chapter "User defined code"'),
  }).required(),
  right: { supplier: 'ENVIRONMENT_ADMIN' },
  response: Joi.object().keys({
    hashId: Joi.string().required().example('y124as'),
    subscriptionHashId: Joi.string().description('Right now the user gets automatically subscribed to alerts on this object. This hashId can be used to remove such an alert'),
  }).required(),
  description: 'Create a report type that devices can send in',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
