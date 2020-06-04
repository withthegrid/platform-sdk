import Joi from '@hapi/joi';
import { ControllerGeneratorOptions } from '../../comms/controller';
import { fieldConfigurationToServerSchema, FieldConfigurationToServer } from '../../models/field-configuration';


interface Request {
  body: {
    name: string;
    start?: 'required' | 'optional' | 'disabled';
    end?: 'required' | 'optional' | 'disabled';
    supplierOnly?: boolean;
    fieldConfigurations: FieldConfigurationToServer[];
  };
}

type EffectiveRequest = {
  body: Required<Request['body']>;
}

interface Response {
  hashId: string;
}


const controllerGeneratorOptions: ControllerGeneratorOptions = {
  method: 'post',
  path: '/',
  body: Joi.object().keys({
    name: Joi.string().required().example('Measurement cycle'),
    start: Joi.allow('required', 'optional', 'disabled').default('optional').description('\'required\': user must provide command.startAt. \'optional\': user can provide command.startAt or a delay for the command to start after it is sent to the device. \'disabled\': user cannot provide command.startAt nor a delay.'),
    end: Joi.allow('required', 'optional', 'disabled').default('disabled').description('\'required\': user must provide command.endAt. \'optional\': user can provide command.endAt. \'disabled\': user cannot provide command.endAt.'),
    supplierOnly: Joi.boolean().default(false).description('If true, this type of command can not be created from an environment'),
    fieldConfigurations: Joi.array().items(fieldConfigurationToServerSchema).required()
      .description('See the chapter on open fields on how to use this'),
  }).required(),
  right: { supplier: 'ENVIRONMENT_ADMIN' },
  response: Joi.object().keys({
    hashId: Joi.string().required().example('x18a92'),
  }).required(),
  description: 'Create a command type that can be sent to devices',
};

export {
  controllerGeneratorOptions,
  Request,
  EffectiveRequest,
  Response,
};
