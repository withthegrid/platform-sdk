import Joi from '@hapi/joi';

import { fieldConfigurationFromServerSchema, FieldConfigurationFromServer } from './field-configuration';

const schema = Joi.object().keys({
  hashId: Joi.string().required().example('x18a92'),
  name: Joi.string().required().example('Measurement cycle'),
  start: Joi.string().valid('required', 'optional', 'disabled').required().example('required')
    .description('\'required\': user must provide command.startAt. \'optional\': user can provide command.startAt or a delay for the command to start after it is sent to the device. \'disabled\': user cannot provide command.startAt nor a delay.'),
  end: Joi.string().valid('required', 'optional', 'disabled').required().example('disabled')
    .description('\'required\': user must provide command.endAt. \'optional\': user can provide command.endAt. \'disabled\': user cannot provide command.endAt.'),
  supplierOnly: Joi.boolean().required().example(false).description('If true, this type of command can not be created from an environment'),
  fieldConfigurations: Joi.array().items(fieldConfigurationFromServerSchema).required()
    .description('See the chapter on open fields on how to use this'),
  channelSelect: Joi.string().valid('single', 'multiple', 'off').required().example('off')
    .description('When creating a command of this type, the user can then optionally choose one (in case of \'single\') or more channelIndices (in case of \'multiple\') for which this command is relevant. If \'off\' is chosen, the user cannot specify channelIndices'),
})
  .description('An object defining what a command type should look like: the template for commands sent to devices')
  .tag('commandType');

interface CommandType {
  hashId: string;
  name: string;
  start: 'required' | 'optional' | 'disabled';
  end: 'required' | 'optional' | 'disabled';
  supplierOnly: boolean;
  fieldConfigurations: FieldConfigurationFromServer[];
  channelSelect: 'single' | 'multiple' | 'off';
}

export {
  schema, CommandType,
};
