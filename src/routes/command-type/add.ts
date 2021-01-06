import Joi from 'joi';
import { ControllerGeneratorOptions } from '../../comms/controller';
import { schema as fieldConfigurationsToServerSchema, FieldConfigurationsToServer } from '../../models/fields/field-configurations-to-server';

interface Request {
  body: {
    name: string;
    start?: 'required' | 'optional' | 'disabled';
    end?: 'required' | 'optional' | 'disabled';
    fieldConfigurations: FieldConfigurationsToServer;
    channelSelect?: 'single' | 'multiple' | 'off';
    environmentAccess?: 'full' | 'read' | 'none';
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
    start: Joi.string().valid('required', 'optional', 'disabled').default('optional').description('\'required\': user must provide command.startAt. \'optional\': user can provide command.startAt or a delay for the command to start after it is sent to the device. \'disabled\': user cannot provide command.startAt nor a delay.'),
    end: Joi.string().valid('required', 'optional', 'disabled').default('disabled').description('\'required\': user must provide command.endAt. \'optional\': user can provide command.endAt. \'disabled\': user cannot provide command.endAt.'),
    fieldConfigurations: fieldConfigurationsToServerSchema.required()
      .description('See the chapter on open fields on how to use this'),
    channelSelect: Joi.string().valid('single', 'multiple', 'off').default('off')
      .description('When creating a command of this type, the user can then optionally choose one (in case of \'single\') or more channelIndices (in case of \'multiple\') for which this command is relevant. If \'off\' is chosen, the user cannot specify channelIndices'),
    environmentAccess: Joi.string().valid('full', 'read', 'none').default('full')
      .description('\'full\': end-users can view, create and delete commands of this type. \'read\': end-users can view but not create and delete commands of this type. \'none\': end-users cannot view, create or delete commands of this type.'),
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
