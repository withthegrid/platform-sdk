import Joi from 'joi';
import { schema as baseFieldSchema, BaseField } from './base-field';

const schema = Joi.object().keys({
  key: Joi.string().pattern(/^[a-z][a-zA-Z\d]*$/).required().example('id'),
  name: Joi.string().required().example('ID as used in our geographic information system'),
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
  text: string;
  value: BaseField;
}

interface BaseFieldConfiguration {
  key: string;
  name: string;
  inputType?: 'text' | 'textarea' | 'select' | 'radio' | 'switch' | 'checkbox' | 'file' | 'files';
  valueOptions?: ValueOption[] | null;
  prefix?: string;
  suffix?: string;
  hint?: string;
}

export {
  schema,
  BaseFieldConfiguration,
};
