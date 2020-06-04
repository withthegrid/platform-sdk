import Joi from '@hapi/joi';
import { ControllerGeneratorOptions } from '../../comms/controller';
import { fieldConfigurationToServerSchema, FieldConfigurationToServer } from '../../models/field-configuration';


interface Request {
  body: {
    name: string;
    fieldConfigurations: {
      pinGroup: FieldConfigurationToServer[];
      pin: FieldConfigurationToServer[];
      measurement: FieldConfigurationToServer[];
    };
    parser: string;
  };
}

interface Response {
  hashId: string;
}

const controllerGeneratorOptions: ControllerGeneratorOptions = {
  method: 'post',
  path: '/',
  body: Joi.object().keys({
    name: Joi.string().required().example('Temperature'),
    fieldConfigurations: Joi.object().keys({
      pinGroup: Joi.array().items(fieldConfigurationToServerSchema).required(),
      pin: Joi.array().items(fieldConfigurationToServerSchema).required(),
      measurement: Joi.array().items(fieldConfigurationToServerSchema).required(),
    }).required()
      .description('See the chapter on open fields on how to use this'),
    parser: Joi.string().required().example('[omitted]').description('A javascript function that parses an incoming report. See [add link]'),
  }).required(),
  right: { supplier: 'ENVIRONMENT_ADMIN' },
  response: Joi.object().keys({
    hashId: Joi.string().required().example('y124as'),
  }).required(),
  description: 'Create a report type that devices can send in',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
