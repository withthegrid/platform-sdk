import Joi from 'joi';
import { ControllerGeneratorOptionsWithClientAndSupplier } from '../../comms/controller';
import { schema as siNumberSchema, SiNumber } from '../../models/si-number';
import { schema as stringOrTranslationsSchema, StringOrTranslations } from '../../models/string-or-translations';

interface Request {
  params: {
    hashId: string;
  };
  body: {
    name?: StringOrTranslations;
    color?: string;
    unit?: string | null;
    defaultOrderOfMagnitude?: number;
    defaultCriticallyLowThreshold?: SiNumber | null;
    defaultLowThreshold?: SiNumber | null;
    defaultHighThreshold?: SiNumber | null;
    defaultCriticallyHighThreshold?: SiNumber | null;
    disableSiPrefixes?: boolean;
    deviceQuantityHashIds?: string[];
  };
}

type Response = void;

const controllerGeneratorOptions: ControllerGeneratorOptionsWithClientAndSupplier = {
  method: 'post',
  path: '/:hashId',
  params: Joi.object().keys({
    hashId: Joi.string().required().example('sajia1'),
  }).required(),
  body: Joi.object().keys({
    name: stringOrTranslationsSchema(255).example('Temperature'),
    color: Joi.string().example('#ff00ff'),
    unit: Joi.string().allow(null).example('K').description('Will be displayed with an SI-prefix (eg. k or M) if relevant'),
    defaultOrderOfMagnitude: Joi.number().integer().min(-128).max(127)
      .example(3)
      .description('Defines default order of magnitude to be selected at manual report form'),
    defaultCriticallyLowThreshold: siNumberSchema.allow(null),
    defaultLowThreshold: siNumberSchema.allow(null),
    defaultHighThreshold: siNumberSchema.allow(null),
    defaultCriticallyHighThreshold: siNumberSchema.allow(null),
    disableSiPrefixes: Joi.boolean().example(true).description('Will disable SI-prefixes for this quantity'),
    deviceQuantityHashIds: Joi.array().items(Joi.string().example('x18a92')).description('Device quantities, linked to this quantity'),
  }).required(),
  right: { environment: 'ENVIRONMENT_ADMIN', supplier: 'ENVIRONMENT_ADMIN' },
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
