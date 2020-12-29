import Joi from 'joi';
import { ControllerGeneratorOptions } from '../../comms/controller';
import {
  schema as updatableFieldConfigurationsSchema,
  UpdatableFieldConfigurations,
} from '../../models/fields/updatable-field-configurations';

type RequestQuantity = {
  name: string;
  unit: string;
} | {
  hashId: string;
};

interface Request {
  params: {
    hashId: string;
  };
  body: {
    name?: string;
    fieldConfigurations?: {
      pinGroup?: UpdatableFieldConfigurations;
      pin?: UpdatableFieldConfigurations;
      measurement?: UpdatableFieldConfigurations;
    };
    quantities?: RequestQuantity[];
  };
}

type Response = void;

const controllerGeneratorOptions: ControllerGeneratorOptions = {
  method: 'post',
  path: '/:hashId',
  params: Joi.object().keys({
    hashId: Joi.string().required().example('l19a7s'),
  }).required(),
  body: Joi.object().keys({
    name: Joi.string().example('Temperature'),
    fieldConfigurations: Joi.object().keys({
      pinGroup: updatableFieldConfigurationsSchema,
      pin: updatableFieldConfigurationsSchema,
      measurement: updatableFieldConfigurationsSchema,
    }).description('See the chapter on open fields on how to use this'),
    quantities: Joi.array().items(Joi.alternatives().try(
      Joi.object().keys({
        name: Joi.string().required().example('Temperature'),
        unit: Joi.string().required().example('K').description('Will be displayed with an SI-prefix (eg. k or M) if relevant'),
      }),
      Joi.object().keys({
        hashId: Joi.string().required(),
      }),
    )),
  }).required(),
  right: { environment: 'ENVIRONMENT_ADMIN' },
  description: 'Update a report type for human reports.',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
