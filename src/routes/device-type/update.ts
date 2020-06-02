import Joi from '@hapi/joi';
import { ControllerGeneratorOptions } from '../../comms/controller';
import {
  updatableFieldConfigurationSchema,
  UpdatableFieldConfiguration,
} from '../../models/field-configuration';


interface Request {
  params: {
    hashId: string;
  };
  body: {
    eventHandler?: string;
    fieldConfigurations?: UpdatableFieldConfiguration[];
    commandTypeHashIds?: string[];
  };
}

type Response = void;


const controllerGeneratorOptions: ControllerGeneratorOptions = {
  method: 'post',
  path: '/:hashId',
  params: Joi.object().keys({
    hashId: Joi.string().required().example('wasd2'),
  }).required(),
  body: Joi.object().keys({
    eventHandler: Joi.string().description('A javascript function that handles events. See [add link]'),
    fieldConfigurations: Joi.array().items(updatableFieldConfigurationSchema),
    commandTypeHashIds: Joi.array().items(Joi.string()).description('The hashIds of the command types a user can schedule for this device'),
  }).required(),
  right: { supplier: 'ENVIRONMENT_ADMIN' },
  description: 'Update the settings of a device type.',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
