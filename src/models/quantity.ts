import Joi from 'joi';
import { schema as siNumberSchema, SiNumber } from './si-number';
import {
  versionedStringOrStringOrTranslationSchema,
  StringOrTranslations,
} from './string-or-translations';

const schema = (apiVersion: number): Joi.ObjectSchema => Joi.object().keys({
  hashId: Joi.string().required().example('sajia1'),
  name: versionedStringOrStringOrTranslationSchema(apiVersion).required().example('Temperature'),
  color: Joi.string().required().example('#ff00ff'),
  unit: (
    apiVersion >= 8
      ? Joi.string().allow(null).default(null)
      : Joi.string().required()
  ).example('K')
    .max(10)
    .description('Will be displayed with an SI-prefix (eg. k or M) if relevant'),
  defaultOrderOfMagnitude: Joi.number().integer().min(-128).max(127)
    .default(0)
    .example(-3)
    .description('Defines default order of magnitude to be selected at manual report form'),
  defaultCriticallyLowThreshold: siNumberSchema.allow(null).default(null),
  defaultLowThreshold: siNumberSchema.allow(null).default(null),
  defaultHighThreshold: siNumberSchema.allow(null).default(null),
  defaultCriticallyHighThreshold: siNumberSchema.allow(null).default(null),
  disableSiPrefixes: Joi.boolean().default(false).example(true).description('Will disable SI-prefixes for this quantity if true'),
})
  .tag('quantity').meta({ className: 'quantity' });

interface Quantity {
  hashId: string;
  name: StringOrTranslations;
  color: string;
  unit: string | null;
  defaultOrderOfMagnitude: number;
  defaultCriticallyLowThreshold: SiNumber | null;
  defaultLowThreshold: SiNumber | null;
  defaultHighThreshold: SiNumber | null;
  defaultCriticallyHighThreshold: SiNumber | null;
  disableSiPrefixes: boolean;
}

export { schema, Quantity };
