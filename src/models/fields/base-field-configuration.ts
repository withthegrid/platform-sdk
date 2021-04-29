import Joi from 'joi';
import { schema as baseFieldSchema, BaseField } from './base-field';

const schema = Joi.object().keys({
  key: Joi.string().pattern(/^[a-z][a-zA-Z\d]*$/).required().example('id'),
  type: Joi.string().required().valid('string', 'boolean', 'number', 'integer')
    .default('string'),
  name: Joi.alternatives(
    Joi.string().required(),
    Joi.object()..required(),
  ),
  inputType: Joi.string().valid('text', 'textarea', 'select', 'radio', 'switch', 'checkbox', 'file', 'files')
    .description('The UI component to show. If not specified, it is text unless valueOptions are provided, then it is select.'),
  valueOptions: Joi.array().items(Joi.object().keys({
    text: Joi.string().required(),
    value: baseFieldSchema.required().description('Will be passed through parser'),
  })).allow(null)
    .description('If null, inputType should not be select or radio. If not null, input type should be select or radio'),
  prefix: Joi.string().description('Not available for inputTypes \'radio\', \'switch\', \'checkbox\', \'file\' and \'files\''),
  suffix: Joi.string().description('Not available for inputTypes \'radio\', \'switch\', \'checkbox\', \'file\' and \'files\''),
  hint: Joi.string().allow('').description('As shown near the input field'),
})
  .tag('baseFieldConfiguration')
  .description('Defines which data can be stored in form fields.');

interface ValueOption {
  // string for backwards compatibility, shown at all locales
  text: string | { [locale: string]: string };
  value: BaseField;
}

interface BaseFieldConfiguration {
  key: string;
  type: 'string' | 'boolean' | 'number' | 'integer'; // in Joi, set string as default
  name: string | { [locale: string]: string }; // string for backwards compatibility, shown at all locales
  inputType: 'text' | 'textarea' | 'select' | 'radio' | 'switch' | 'checkbox' | 'file' | 'files'; // in Joi, set to text by default, unless valueOptions are provided, then set to select
  defaultValue: string | boolean | number; // in Joi, set default based on type: '' for string, true for boolean, 0 for number and integer
  valueOptions: ValueOption[] | null;  // in Joi, set to null by default
  regex?: string; // if provided, type should be string and the provided value should adhere to this regex
  lowerbound?: number; // if provided, type should be number or integer (and lowerbound should be integer as well in case type is integer) and provided value should not be lower than this value
  upperbound?: number; // if provided, type should be number or integer (and lowerbound should be integer as well in case type is integer) and provided value should not be higher than this value
  showIf?: { key: string, value: string | boolean | number }; // key should be of a configuration earlier in the array, otherwise the configuration is not accepted (to avoid circular references)
  prefix?: string | { [locale: string]: string }; // string for backwards compatibility, shown at all locales
  suffix?: string | { [locale: string]: string }; // string for backwards compatibility, shown at all locales
  hint?: string | { [locale: string]: string }; // string for backwards compatibility, shown at all locales
}

export {
  schema,
  BaseFieldConfiguration,
};
