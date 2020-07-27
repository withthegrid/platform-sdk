import Joi from '@hapi/joi';
import { ControllerGeneratorOptions } from '../../comms/controller';
import { schema as fieldConfigurationToServerSchema, FieldConfigurationToServer } from '../../models/fields/field-configuration-to-server';

type RequestQuantity = {
  name: string;
  unit: string;
} | {
  hashId: string;
};

interface Request {
  body: {
    name: string;
    fieldConfigurations: {
      pinGroup: FieldConfigurationToServer[];
      pin: FieldConfigurationToServer[];
      measurement: FieldConfigurationToServer[];
    };
    quantities: RequestQuantity[];
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
    quantities: Joi.array().items(Joi.alternatives().try(
      Joi.object().keys({
        name: Joi.string().required().example('Temperature'),
        unit: Joi.string().required().example('K').description('Will be displayed with an SI-prefix (eg. k or M) if relevant'),
      }),
      Joi.object().keys({
        hashId: Joi.string().required(),
      }),
    )).required(),
  }).required(),
  right: { environment: 'ENVIRONMENT_ADMIN' },
  response: Joi.object().keys({
    hashId: Joi.string().required().example('l19a7s'),
  }).required(),
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
