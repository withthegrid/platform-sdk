import Joi from 'joi';
import { ControllerGeneratorOptionsWithSupplier } from '../../comms/controller';
import {
  schema as updatableFieldConfigurationsSchema,
  UpdatableFieldConfigurations,
} from '../../models/fields/updatable-field-configurations';
import { schema as stringOrTranslationsSchema, StringOrTranslations } from '../../models/string-or-translations';

interface Request {
  params: {
    hashId: string;
  };
  body: {
    name?: StringOrTranslations;
    start?: 'required' | 'optional' | 'disabled';
    end?: 'required' | 'optional' | 'disabled';
    fieldConfigurations?: UpdatableFieldConfigurations;
    channelSelect?: 'single' | 'multiple' | 'off';
    environmentAccess?: 'full' | 'read' | 'none';
  };
}

type Response = void;

const controllerGeneratorOptions: ControllerGeneratorOptionsWithSupplier = {
  method: 'post',
  path: '/:hashId',
  params: Joi.object().keys({
    hashId: Joi.string().required().example('x18a92'),
  }).required(),
  body: (apiVersion: number): Joi.ObjectSchema => Joi.object().keys({
    name: stringOrTranslationsSchema().example('Measurement cycle'),
    start: Joi.string().valid('required', 'optional', 'disabled').description('\'required\': user must provide command.startAt. \'optional\': user can provide command.startAt or a delay for the command to start after it is sent to the device. \'disabled\': user cannot provide command.startAt nor a delay.'),
    end: Joi.string().valid('required', 'optional', 'disabled').description('\'required\': user must provide command.endAt. \'optional\': user can provide command.endAt. \'disabled\': user cannot provide command.endAt.'),
    fieldConfigurations: updatableFieldConfigurationsSchema(apiVersion).description('See the chapter on open fields on how to use this'),
    channelSelect: Joi.string().valid('single', 'multiple', 'off')
      .description('When creating a command of this type, the user can then optionally choose one (in case of \'single\') or more channelIndices (in case of \'multiple\') for which this command is relevant. If \'off\' is chosen, the user cannot specify channelIndices'),
    environmentAccess: Joi.string().valid('full', 'read', 'none').default('full')
      .description('\'full\': end-users can view, create and delete commands of this type. \'read\': end-users can view but not create and delete commands of this type. \'none\': end-users cannot view, create or delete commands of this type.'),
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
