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
      is: Joi.string().valid('switch', 'checkbox').required(),
      then: Joi.string().valid('boolean').default('boolean'),
    })
    .when(Joi.ref('inputType'), {
      is: Joi.string().valid('text', 'textarea').required(),
      then: Joi.string().valid('string').default('string'),
    }),
  name: stringOrTranslationsSchema.required(),
  inputType: Joi
    .when(Joi.ref('valueOptions'), {
      is: Joi.array().min(1).items(Joi.object().keys({
        text: stringOrTranslationsSchema.required(),
        value: baseFieldSchema.required().description('Will be passed through parser'),
      }).required()).required(),
      then: Joi.string()
        .valid('select', 'radio')
        .default('select'),
      otherwise: Joi.when(Joi.ref('type'), {
        is: Joi.string().valid('number', 'integer').required(),
        then: Joi.string().valid('text').default('text'),
        otherwise: Joi.when(Joi.ref('type'), {
          is: Joi.string().valid('boolean').required(),
          then: Joi.string().valid('switch', 'checkbox').default('checkbox'),
          otherwise: Joi.string().valid('text', 'textarea', 'file', 'files').default('text'),
        }),
      }),
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
  regex: Joi.string().description('If provided, type should be string and the provided value should adhere to this regex'),
  lowerbound: Joi.number().description('If provided, type should be number or integer and provided value should not be lower than this value'),
  upperbound: Joi.number().description('If provided, type should be number or integer and provided value should not be higher than this value'),
  showIf: Joi.object().keys({
    key: Joi.string().required(),
    value: Joi.alternatives(
      Joi.number(),
      Joi.string(),
      Joi.boolean(),
    ).required(),
  }).description('Show this field if other field with provided key is set to provided value. Referenced field must exists already'),
  prefix: stringOrTranslationsSchema.description('Not available for inputTypes \'radio\', \'switch\', \'checkbox\', \'file\' and \'files\''),
  suffix: stringOrTranslationsSchema.description('Not available for inputTypes \'radio\', \'switch\', \'checkbox\', \'file\' and \'files\''),
  hint: Joi.string().allow('').description('As shown near the input field'),
})
  .tag('baseFieldConfiguration')
  .description('Defines which data can be stored in form fields.');

interface ValueOption<T extends BaseField = BaseField> {
  // string for backwards compatibility, shown at all locales
  text: StringOrTranslations;
  value: T;
}

interface SharedBaseFieldConfiguration {
  /**
   * key used to store the field value
   * @pattern ^[a-z][a-zA-Z\d]*$
   */
  key: string;
  /**
   * name of the field to be shown in UI
   */
  name: StringOrTranslations;
  /**
   * show this field in UI only if value of another form field, identified by provided `key`, is
   * equal to provided `value`
   */
  showIf?: { key: string, value: string | boolean | number };
  prefix?: StringOrTranslations;
  suffix?: StringOrTranslations;
  hint?: StringOrTranslations;
}

type integer = number;

type BaseFieldConfiguration = ({
  type: 'string';
  /**
   * @default ""
   */
  defaultValue: string;
  /**
   * @default null
   */
  valueOptions: null | [];
  /**
   * @default "text"
   */
  inputType: 'text' | 'textarea';
  regex?: string;
} | {
  type: 'string';
  /**
   * @default ""
   */
  defaultValue: string;
  /**
   * @minItems 2
   */
  valueOptions: ValueOption<string>[];
  /**
   * @default "select"
   */
  inputType: 'select' | 'radio';
} | {
  type: 'number';
  /**
   * @default 0
   */
  defaultValue: number;
  /**
   * @default null
   */
  valueOptions: null | [];
  /**
   * @default "text"
   */
  inputType: 'text';
  lowerbound?: number;
  upperbound?: number;
} | {
  type: 'number';
  /**
   * @default 0
   */
  defaultValue: number;
  /**
   * @minItems 2
   */
  valueOptions: ValueOption<number>[];
  /**
   * @default "select"
   */
  inputType: 'select' | 'radio';
} | {
  type: 'integer';
  /**
   * @default 0
   */
  defaultValue: integer;
  /**
   * @default null
   */
  valueOptions: null | [];
  /**
   * @default "text"
   */
  inputType: 'text';
  lowerbound?: number;
  upperbound?: number;
} | {
  type: 'integer';
  /**
   * @default 0
   */
  defaultValue: integer;
  /**
   * @minItems 2
   */
  valueOptions: ValueOption<integer>[];
  inputType: 'select' | 'radio';
} | {
  type: 'boolean';
  /**
   * @default false
   */
  defaultValue: boolean;
  /**
   * @default null
   */
  valueOptions: null | [];
  /**
   * @default "checkbox"
   */
  inputType: 'switch' | 'checkbox';
} | {
  type: 'boolean';
  /**
   * @default false
   */
  defaultValue: boolean;
  /**
   * @minItems 2
   */
  valueOptions: ValueOption<boolean>[];
  /**
   * @default "select"
   */
  inputType: 'select' | 'radio';
} | {
  inputType: 'file' | 'files';
}) & SharedBaseFieldConfiguration;

export {
  schema,
  BaseFieldConfiguration,
};
