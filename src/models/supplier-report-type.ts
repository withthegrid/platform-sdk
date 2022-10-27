import Joi from 'joi';

import { schema as baseFieldConfigurationSchema, BaseFieldConfiguration } from './fields/base-field-configuration';
import {
  versionedStringOrStringOrTranslationSchema,
  StringOrTranslations,
} from './string-or-translations';

const schema = (apiVersion: number): Joi.ObjectSchema => Joi.object().keys({
  hashId: Joi.string().required().example('l19a7s'),
  name: versionedStringOrStringOrTranslationSchema(apiVersion).required().example('Temperature and inclination'),
  fieldConfigurations: Joi.object().keys({
    pinGroup: Joi.array().items(baseFieldConfigurationSchema(apiVersion)).required(),
    pin: Joi.array().items(baseFieldConfigurationSchema(apiVersion)).required(),
    measurement: Joi.array().items(baseFieldConfigurationSchema(apiVersion)).required(),
  }).required()
    .description('See the chapter on open fields on how to use this'),
  deletedAt: Joi.date().allow(null).required().example(null),
}).description('An object defining what a condition report should look like, used in connectivity environments')
  .tag('supplierReportType')
  .meta({ className: 'supplierReportType' });

interface SupplierReportType {
  hashId: string;
  name: StringOrTranslations;
  fieldConfigurations: {
    pinGroup: BaseFieldConfiguration[];
    pin: BaseFieldConfiguration[];
    measurement: BaseFieldConfiguration[];
  };
  deletedAt: Date | null;
}

export { schema, SupplierReportType };
