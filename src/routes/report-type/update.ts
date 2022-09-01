import Joi from 'joi';
import { ControllerGeneratorOptionsWithClient } from '../../comms/controller';
import {
  schema as updatableFieldConfigurationsSchema,
  UpdatableFieldConfigurations,
} from '../../models/fields/updatable-field-configurations';
import { schema as siNumberSchema, SiNumber } from '../../models/si-number';

type RequestQuantity = {
  name: string;
  unit: string | null;
  defaultOrderOfMagnitude: number;
  defaultCriticallyLowThreshold: SiNumber | null;
  defaultLowThreshold: SiNumber | null;
  defaultHighThreshold: SiNumber | null;
  defaultCriticallyHighThreshold: SiNumber | null;
  disableSiPrefixes: boolean;
  color: string;
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

const controllerGeneratorOptions: ControllerGeneratorOptionsWithClient = {
  method: 'post',
  path: '/:hashId',
  params: Joi.object().keys({
    hashId: Joi.string().required().example('l19a7s'),
  }).required(),
  body: (apiVersion: number): Joi.ObjectSchema => Joi.object().keys({
    name: Joi.string().example('Temperature'),
    fieldConfigurations: Joi.object().keys({
      pinGroup: updatableFieldConfigurationsSchema(apiVersion),
      pin: updatableFieldConfigurationsSchema(apiVersion),
      measurement: updatableFieldConfigurationsSchema(apiVersion),
    }).description('See the chapter on open fields on how to use this'),
    quantities: Joi.array().items(Joi.alternatives().try(
      Joi.object().keys({
        name: Joi.string().required().example('Temperature'),
        unit: Joi.string().allow(null).default(null).example('K')
          .description('Will be displayed with an SI-prefix (eg. k or M) if relevant'),
        defaultOrderOfMagnitude: Joi.number().integer().min(-128).max(127)
          .example(3)
          .default(0)
          .description('Defines default order of magnitude to be selected at manual report form'),
        defaultCriticallyLowThreshold: siNumberSchema.allow(null).default(null),
        defaultLowThreshold: siNumberSchema.allow(null).default(null),
        defaultHighThreshold: siNumberSchema.allow(null).default(null),
        defaultCriticallyHighThreshold: siNumberSchema.allow(null).default(null),
        disableSiPrefixes: Joi.boolean().default(false).example(true).description('Will disable SI-prefixes for this quantity if true'),
        color: Joi.string().default('#ff00ff').example('#ff00ff'),
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
