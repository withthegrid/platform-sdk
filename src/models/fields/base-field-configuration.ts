import Joi from 'joi';
import { BaseField } from './base-field';
import {
  schema as stringOrTranslationsSchema,
  StringOrTranslations,
} from '../string-or-translations';

const commonBaseFieldConfigurationSchema = Joi.object().keys({
  key: Joi.string().pattern(/^[a-z][a-zA-Z\d]*$/).required().example('id'),
  name: stringOrTranslationsSchema.required(),
  showIf: Joi.object().keys({
    key: Joi.string().required(),
    value: Joi.alternatives(
      Joi.string().allow('').strict(),
      Joi.number().strict(),
      Joi.boolean().strict(),
    ).required(),
  }).description('Show this field if other field with provided key is set to provided value. Referenced field must exists already'),
  hint: stringOrTranslationsSchema.allow('').description('As shown near the input field'),
  // the below are needed to validate objects that do not need these props, but
  // have them set at undefined
  prefix: Joi.any().forbidden(),
  suffix: Joi.any().forbidden(),
  defaultValue: Joi.any().forbidden(),
  type: Joi.any().forbidden(),
  regex: Joi.any().forbidden(),
  lowerbound: Joi.any().forbidden(),
  upperbound: Joi.any().forbidden(),
});

const prefixesMixin = {
  prefix: stringOrTranslationsSchema.description('Not available for inputTypes \'radio\', \'switch\', \'checkbox\', \'file\' and \'files\''),
  suffix: stringOrTranslationsSchema.description('Not available for inputTypes \'radio\', \'switch\', \'checkbox\', \'file\' and \'files\''),
};

const getBaseFieldConfigurationSchema = (
  commonSchema: Joi.ObjectSchema,
): Joi.AlternativesSchema => Joi.alternatives().try(
  commonSchema.keys({
    type: Joi.string().valid('string').default('string'),
    defaultValue: Joi.string().allow('').default(''),
    valueOptions: Joi.array().items(Joi.any()).length(0).allow(null)
      .default(null),
    inputType: Joi.string().valid('text', 'textarea').default('text'),
    regex: Joi.string(),
    ...prefixesMixin,
  }),
  commonSchema.keys({
    type: Joi.string().valid('string').default('string'),
    defaultValue: Joi.string().allow('').default(''),
    valueOptions: Joi.array().min(1).items(Joi.object().keys({
      text: stringOrTranslationsSchema.required(),
      value: Joi.string().allow('').required(),
    })).required(),
    inputType: Joi.string().valid('select').default('select'),
    ...prefixesMixin,
  }),
  commonSchema.keys({
    type: Joi.string().valid('string').default('string'),
    defaultValue: Joi.string().allow('').default(''),
    valueOptions: Joi.array().min(1).items(Joi.object().keys({
      text: stringOrTranslationsSchema.required(),
      value: Joi.string().allow('').required(),
    })).required(),
    inputType: Joi.string().valid('radio').required(),
  }),
  commonSchema.keys({
    type: Joi.string().valid('number').required(),
    defaultValue: Joi.number().default(0),
    valueOptions: Joi.array().items(Joi.any()).length(0).allow(null)
      .default(null),
    inputType: Joi.string().valid('text').default('text'),
    lowerbound: Joi.number().description('If provided, type should be number or integer and provided value should not be lower than this value'),
    upperbound: Joi.number().description('If provided, type should be number or integer and provided value should not be higher than this value'),
    ...prefixesMixin,
  }),
  commonSchema.keys({
    type: Joi.string().valid('number').default('number'),
    defaultValue: Joi.number().default(0),
    valueOptions: Joi.array().min(1).items(Joi.object().keys({
      text: stringOrTranslationsSchema.required(),
      value: Joi.number().required(),
    })).required(),
    inputType: Joi.string().valid('select').default('select'),
    ...prefixesMixin,
  }),
  commonSchema.keys({
    type: Joi.string().valid('number').default('number'),
    defaultValue: Joi.number().default(0),
    valueOptions: Joi.array().min(1).items(Joi.object().keys({
      text: stringOrTranslationsSchema.required(),
      value: Joi.number().required(),
    })).required(),
    inputType: Joi.string().valid('radio').required(),
  }),
  commonSchema.keys({
    type: Joi.string().valid('integer').required(),
    defaultValue: Joi.number().integer().default(0),
    valueOptions: Joi.array().items(Joi.any()).length(0).allow(null)
      .default(null),
    inputType: Joi.string().valid('text').default('text'),
    lowerbound: Joi.number().description('If provided, type should be number or integer and provided value should not be lower than this value'),
    upperbound: Joi.number().description('If provided, type should be number or integer and provided value should not be higher than this value'),
    ...prefixesMixin,
  }),
  commonSchema.keys({
    type: Joi.string().valid('integer').required(),
    defaultValue: Joi.number().integer().default(0),
    valueOptions: Joi.array().min(1).items(Joi.object().keys({
      text: stringOrTranslationsSchema.required(),
      value: Joi.number().integer().required(),
    })).required(),
    inputType: Joi.string().valid('select').default('select'),
    ...prefixesMixin,
  }),
  commonSchema.keys({
    type: Joi.string().valid('integer').required(),
    defaultValue: Joi.number().integer().default(0),
    valueOptions: Joi.array().min(1).items(Joi.object().keys({
      text: stringOrTranslationsSchema.required(),
      value: Joi.number().integer().required(),
    })).required(),
    inputType: Joi.string().valid('radio').required(),
  }),
  commonSchema.keys({
    type: Joi.string().valid('boolean').required(),
    defaultValue: Joi.boolean().default(false),
    valueOptions: Joi.array().items(Joi.any()).length(0).allow(null)
      .default(null),
    inputType: Joi.string().valid('switch', 'checkbox').default('checkbox'),
  }),
  commonSchema.keys({
    type: Joi.string().valid('boolean').default('boolean'),
    defaultValue: Joi.boolean().default(false),
    valueOptions: Joi.array().items(Joi.any()).length(0).allow(null)
      .default(null),
    inputType: Joi.string().valid('switch', 'checkbox').required(),
  }),
  commonSchema.keys({
    type: Joi.string().valid('boolean').default('boolean'),
    defaultValue: Joi.boolean().default(false),
    valueOptions: Joi.array().min(1).items(Joi.object().keys({
      text: stringOrTranslationsSchema.required(),
      value: Joi.boolean().required(),
    })).required(),
    inputType: Joi.string().valid('select').default('select'),
    ...prefixesMixin,
  }),
  commonSchema.keys({
    type: Joi.string().valid('boolean').default('boolean'),
    defaultValue: Joi.boolean().default(false),
    valueOptions: Joi.array().min(1).items(Joi.object().keys({
      text: stringOrTranslationsSchema.required(),
      value: Joi.boolean().required(),
    })).required(),
    inputType: Joi.string().valid('radio').required(),
  }),
  commonSchema.keys({
    inputType: Joi.string().valid('file', 'files').required(),
    valueOptions: Joi.array().items(Joi.any()).length(0).allow(null)
      .default(null),
  }),
)
  .tag('baseFieldConfiguration')
  .description('Defines which data can be stored in form fields.');

const schema = getBaseFieldConfigurationSchema(commonBaseFieldConfigurationSchema);

interface ValueOption<T extends BaseField> {
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
   * show this field in UI only if value of an earlier form field, identified by provided `key`, is
   * equal to provided `value`
   */
  showIf?: { key: string, value: string | boolean | number };
  hint?: StringOrTranslations;
}

interface PrefixMixin {
  prefix?: StringOrTranslations;
  suffix?: StringOrTranslations;
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
} & PrefixMixin | {
  type: 'string';
  /**
   * @default ""
   */
  defaultValue: string;
  /**
   * @minItems 1
   */
  valueOptions: ValueOption<string>[];
  /**
   * @default "select"
   */
  inputType: 'select';
} & PrefixMixin | {
  type: 'string';
  /**
   * @default ""
   */
  defaultValue: string;
  /**
   * @minItems 1
   */
  valueOptions: ValueOption<string>[];
  inputType: 'radio';
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
} & PrefixMixin | {
  type: 'number';
  /**
   * @default 0
   */
  defaultValue: number;
  /**
   * @minItems 1
   */
  valueOptions: ValueOption<number>[];
  /**
   * @default "select"
   */
  inputType: 'select';
} & PrefixMixin | {
  type: 'number';
  /**
   * @default 0
   */
  defaultValue: number;
  /**
   * @minItems 1
   */
  valueOptions: ValueOption<number>[];
  inputType: 'radio';
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
   * type of UI input element used for the field
   *
   * @default "text"
   */
  inputType: 'text';
  lowerbound?: number;
  upperbound?: number;
} & PrefixMixin | {
  type: 'integer';
  /**
   * @default 0
   */
  defaultValue: integer;
  /**
   * @minItems 1
   */
  valueOptions: (Omit<ValueOption<integer>, 'value'> & {
    value: integer;
  })[];
  /**
   * @default 'select'
   */
  inputType: 'select';
} & PrefixMixin | {
  type: 'integer';
  /**
   * @default 0
   */
  defaultValue: integer;
  /**
   * @minItems 1
   */
  valueOptions: (Omit<ValueOption<integer>, 'value'> & {
    value: integer;
  })[];
  inputType: 'radio';
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
   * @minItems 1
   */
  valueOptions: ValueOption<boolean>[];
  /**
   * @default "select"
   */
  inputType: 'select';
} & PrefixMixin | {
  type: 'boolean';
  /**
   * @default false
   */
  defaultValue: boolean;
  /**
   * @minItems 1
   */
  valueOptions: ValueOption<boolean>[];
  /**
   * @default "select"
   */
  inputType: 'radio';
} | {
  inputType: 'file' | 'files';
  valueOptions: null | [];
}) & SharedBaseFieldConfiguration;

type BaseFieldConfigurations = BaseFieldConfiguration[];

export {
  schema,
  BaseFieldConfiguration,
  BaseFieldConfigurations,
  getBaseFieldConfigurationSchema,
  commonBaseFieldConfigurationSchema,
};
