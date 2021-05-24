import Joi from 'joi';
import { schema as baseFieldSchema, BaseField } from './base-field';
import {
  stringOrTranslationsSchema,
  StringOrTranslations,
} from '../../translations';

const schema = Joi.object().keys({
  key: Joi.string().pattern(/^[a-z][a-zA-Z\d]*$/).required().example('id'),
  type: Joi.string().valid('string', 'boolean', 'number', 'integer')
    .default('string')
    .when(Joi.ref('regex'), {
      is: Joi.string().required(),
      then: Joi.string().valid('string').default('string'),
    })
    .when(Joi.ref('lowerbound'), {
      is: Joi.number().required(),
      then: Joi.string().valid('number').default('number'),
    })
    .when(Joi.ref('upperbound'), {
      is: Joi.number().required(),
      then: Joi.string().valid('number').default('number'),
    })
    .when(Joi.ref('inputType'), {
      is: Joi.string().valid('switch', 'checkbox', 'radio', 'select').required(),
      then: Joi.string().valid('boolean').default('boolean'),
    })
    .when(Joi.ref('inputType'), {
      is: Joi.string().valid('text', 'textarea').required(),
      then: Joi.string().valid('string').default('string'),
    }),
  name: stringOrTranslationsSchema.required(),
  inputType: Joi
    .when(Joi.ref('valueOptions'), {
      is: Joi.array().required(),
      then: Joi.string()
        .valid('select', 'radio')
        .default('select'),
      otherwise: Joi.string()
        .valid('text', 'textarea', 'switch', 'checkbox', 'file', 'files')
        .default('text'),
    })
    .description('The UI component to show. If not specified, it is text unless valueOptions are provided, then it is select.'),
  defaultValue: Joi
    .when(Joi.ref('type'), {
      is: 'string',
      then: Joi.string().allow('').default(''),
    })
    .when(Joi.ref('type'), {
      is: 'number',
      then: Joi.number().default(0),
    })
    .when(Joi.ref('type'), {
      is: 'integer',
      then: Joi.number().integer().default(0),
    })
    .when(Joi.ref('type'), {
      is: 'boolean',
      then: Joi.boolean().default(false),
    }),
  valueOptions: Joi.array().items(Joi.object().keys({
    text: stringOrTranslationsSchema.required(),
    value: baseFieldSchema.required().description('Will be passed through parser'),
  })).allow(null).default(null)
    .description('If null, inputType should not be select or radio. If not null, input type should be select or radio. Default: null'),
  regex: Joi.string().description('If provided, type should be string and the provided value should adhere to this regex')
    .when(Joi.ref('type'), {
      not: 'string',
      then: Joi.forbidden(),
    }),
  lowerbound: Joi.number().description('If provided, type should be number or integer and provided value should not be lower than this value')
    .when(Joi.ref('type'), {
      not: ['number', 'integer'],
      then: Joi.forbidden(),
    }),
  upperbound: Joi.number().description('If provided, type should be number or integer and provided value should not be higher than this value')
    .when(Joi.ref('type'), {
      not: ['number', 'integer'],
      then: Joi.forbidden(),
    }),
  showIf: Joi.object().keys({
    key: Joi.string().required(),
    value: Joi.alternatives(
      Joi.number(),
      Joi.string(),
      Joi.boolean(),
    ).required(),
  }).description('Show this field if other field with provided key is set to provided value. Referenced field must exists already'),
  prefix: stringOrTranslationsSchema.description('Not available for inputTypes \'radio\', \'switch\', \'checkbox\', \'file\' and \'files\'')
    .when(Joi.ref('type'), {
      not: 'string',
      then: Joi.forbidden(),
    }),
  suffix: stringOrTranslationsSchema.description('Not available for inputTypes \'radio\', \'switch\', \'checkbox\', \'file\' and \'files\'')
    .when(Joi.ref('type'), {
      not: 'string',
      then: Joi.forbidden(),
    }),
  hint: Joi.string().allow('').description('As shown near the input field'),
})
  .tag('baseFieldConfiguration')
  .description('Defines which data can be stored in form fields.');

interface ValueOption {
  // string for backwards compatibility, shown at all locales
  text: StringOrTranslations;
  value: BaseField;
}

interface BaseFieldConfiguration {
  key: string;
  type: 'string' | 'boolean' | 'number' | 'integer';
  name: StringOrTranslations;
  inputType: 'text' | 'textarea' | 'select' | 'radio' | 'switch' | 'checkbox' | 'file' | 'files';
  defaultValue: string | boolean | number;
  valueOptions: ValueOption[] | null;
  regex?: string;
  lowerbound?: number;
  upperbound?: number;
  showIf?: { key: string, value: string | boolean | number };
  prefix?: StringOrTranslations;
  suffix?: StringOrTranslations;
  hint?: StringOrTranslations;
}

export {
  schema,
  BaseFieldConfiguration,
};
