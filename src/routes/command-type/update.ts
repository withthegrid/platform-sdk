import Joi from '@hapi/joi';
import { ControllerGeneratorOptions } from '../../comms/controller';
import {
  schema as updatableFieldConfigurationSchema,
  UpdatableFieldConfiguration,
} from '../../models/fields/updatable-field-configuration';

interface Request {
  params: {
    hashId: string;
  };
  body: {
    name?: string;
    start?: 'required' | 'optional' | 'disabled';
    end?: 'required' | 'optional' | 'disabled';
    supplierOnly?: boolean;
    fieldConfigurations?: UpdatableFieldConfiguration[];
    channelSelect?: 'single' | 'multiple' | 'off';
  };
}

type Response = void;

const controllerGeneratorOptions: ControllerGeneratorOptions = {
  method: 'post',
  path: '/:hashId',
  params: Joi.object().keys({
    hashId: Joi.string().required().example('x18a92'),
  }).required(),
  body: Joi.object().keys({
    name: Joi.string().example('Measurement cycle'),
    start: Joi.string().valid('required', 'optional', 'disabled').description('\'required\': user must provide command.startAt. \'optional\': user can provide command.startAt or a delay for the command to start after it is sent to the device. \'disabled\': user cannot provide command.startAt nor a delay.'),
    end: Joi.string().valid('required', 'optional', 'disabled').description('\'required\': user must provide command.endAt. \'optional\': user can provide command.endAt. \'disabled\': user cannot provide command.endAt.'),
    supplierOnly: Joi.boolean().description('If true, this type of command can not be created from an environment'),
    fieldConfigurations: Joi.array().items(updatableFieldConfigurationSchema)
      .description('See the chapter on open fields on how to use this'),
    channelSelect: Joi.string().valid('single', 'multiple', 'off')
      .description('When creating a command of this type, the user can then optionally choose one (in case of \'single\') or more channelIndices (in case of \'multiple\') for which this command is relevant. If \'off\' is chosen, the user cannot specify channelIndices'),
  }).required(),
  right: { supplier: 'ENVIRONMENT_ADMIN' },
  description: 'Update a command type.',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
