import Joi from '@hapi/joi';
import { schema as fileToFieldConfigurationUdfSchema, FileToFieldConfigurationUdf } from '../file-to-field-configuration-udf';
import { schema as baseFieldSchema, BaseField } from './base-field';

type FieldToFieldConfigurationUdf = BaseField | FileToFieldConfigurationUdf[];

// strict(): do not do casting here, otherwise for example a string might end up as a number
const schema = Joi.alternatives().try(
  baseFieldSchema,
  Joi.array().items(fileToFieldConfigurationUdfSchema).required(),
)
  .tag('fieldToFieldConfigurationUdf')
  .description('Defines which data can be stored in form fields and how that is shared with user defined functions.');

export {
  schema,
  FieldToFieldConfigurationUdf,
};
