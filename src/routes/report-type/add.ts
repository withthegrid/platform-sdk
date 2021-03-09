import Joi from 'joi';
import { ControllerGeneratorOptions } from '../../comms/controller';
import { schema as fieldConfigurationsToServerSchema, FieldConfigurationsToServer } from '../../models/fields/field-configurations-to-server';
import { schema as siNumberSchema, SiNumber } from '../../models/si-number';

type RequestQuantity = {
  name: string;
  unit: string;
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
  body: {
    name: string;
    fieldConfigurations: {
      pinGroup: FieldConfigurationsToServer;
      pin: FieldConfigurationsToServer;
      measurement: FieldConfigurationsToServer;
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
      pinGroup: fieldConfigurationsToServerSchema.required(),
      pin: fieldConfigurationsToServerSchema.required(),
      measurement: fieldConfigurationsToServerSchema.required(),
    }).required()
      .description('See the chapter on open fields on how to use this'),
    quantities: Joi.array().items(Joi.alternatives().try(
      Joi.object().keys({
        name: Joi.string().required().example('Temperature'),
        unit: Joi.string().required().example('K').description('Will be displayed with an SI-prefix (eg. k or M) if relevant'),
        defaultOrderOfMagnitude: Joi.number().integer().min(-128).max(127)
          .default(0)
          .example(3)
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
    )).required(),
  }).required(),
  right: { environment: 'ENVIRONMENT_ADMIN' },
  response: Joi.object().keys({
    hashId: Joi.string().required().example('l19a7s'),
  }).required(),
  description: 'Add a report type for human reports.',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
