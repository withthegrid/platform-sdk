import Joi from '@hapi/joi';
import { ControllerGeneratorOptions } from '../../comms/controller';
import { schema as fieldConfigurationSchema, FieldConfiguration } from '../../models/field-configuration';
import { parserExample } from '../../models/supplier-report-type';


interface Request {
  body: {
    name: string;
    fieldConfigurations: {
      pinGroup: FieldConfiguration[];
      pin: FieldConfiguration[];
      measurement: FieldConfiguration[];
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
      pinGroup: Joi.array().items(fieldConfigurationSchema).required(),
      pin: Joi.array().items(fieldConfigurationSchema).required(),
      measurement: Joi.array().items(fieldConfigurationSchema).required(),
    }).required()
      .description('See the chapter on open fields on how to use this'),
    parser: Joi.string().required().example(parserExample).description('A javascript function that parses an incoming report. See [add link]'),
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
