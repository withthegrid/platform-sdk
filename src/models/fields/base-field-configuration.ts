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
});

const prefixesMixin = {
  prefix: stringOrTranslationsSchema.description('Not available for inputTypes \'radio\', \'switch\', \'checkbox\', \'file\' and \'files\''),
  suffix: stringOrTranslationsSchema.description('Not available for inputTypes \'radio\', \'switch\', \'checkbox\', \'file\' and \'files\''),
};

const schema = (apiVersion: number): Joi.AlternativesSchema => {
  let deprecatedAllowNull: Record<string, Joi.AnySchema>;
  let deprecatedValueOptions: Record<string, Joi.AnySchema>;
  let deprecatedDefaultValue: Record<string, Joi.AnySchema>;
  if (apiVersion <= 4) {
    deprecatedAllowNull = {
      allowNull: Joi.any()
        .when('defaultValue', { is: Joi.exist(), then: Joi.boolean().default(false), otherwise: Joi.boolean().default(true) })
        .description('Ignored and for legacy purposes only. Instead, use defaultValue'),
    };
    deprecatedValueOptions = {
      valueOptions: Joi.array().items(Joi.any()).length(0).allow(null)
        .default(null),
    };
    deprecatedDefaultValue = {
      defaultValue: Joi.any().description('Ignored, for legacy purposes only'),
    };
  } else {
    deprecatedAllowNull = {};
    deprecatedValueOptions = {};
    deprecatedDefaultValue = {};
  }

  return Joi.alternatives().try(
    commonBaseFieldConfigurationSchema.keys({
      ...deprecatedAllowNull,
      ...deprecatedValueOptions,
      type: Joi.string().valid('string').default('string'),
      defaultValue: Joi.string().allow(''),
      inputType: Joi.string().valid('text', 'textarea').default('text'),
      regex: Joi.string(),
      ...prefixesMixin,
    }),
    commonBaseFieldConfigurationSchema.keys({
      ...deprecatedAllowNull,
      type: Joi.string().valid('string').default('string'),
      defaultValue: Joi.string().allow(''),
      valueOptions: Joi.array().min(1).items(Joi.object().keys({
        text: stringOrTranslationsSchema.required(),
        value: Joi.string().allow('').required(),
      })).required(),
      inputType: Joi.string().valid('select').default('select'),
      ...prefixesMixin,
    }),
    commonBaseFieldConfigurationSchema.keys({
      type: Joi.string().valid('string').default('string'),
      ...deprecatedDefaultValue,
      valueOptions: Joi.array().min(1).items(Joi.object().keys({
        text: stringOrTranslationsSchema.required(),
        value: Joi.string().allow('').required(),
      })).required(),
      inputType: Joi.string().valid('radio').required(),
    }),
    commonBaseFieldConfigurationSchema.keys({
      ...deprecatedAllowNull,
      ...deprecatedValueOptions,
      type: Joi.string().valid('number').required(),
      defaultValue: Joi.number(),
      inputType: Joi.string().valid('text').default('text'),
      lowerbound: Joi.number().description('If provided, type should be number or integer and provided value should not be lower than this value'),
      upperbound: Joi.number().description('If provided, type should be number or integer and provided value should not be higher than this value'),
      ...prefixesMixin,
    }),
    commonBaseFieldConfigurationSchema.keys({
      ...deprecatedAllowNull,
      ...deprecatedValueOptions,
      type: Joi.string().valid('integer').required(),
      defaultValue: Joi.number().integer(),
      inputType: Joi.string().valid('text').default('text'),
      lowerbound: Joi.number().description('If provided, type should be number or integer and provided value should not be lower than this value'),
      upperbound: Joi.number().description('If provided, type should be number or integer and provided value should not be higher than this value'),
      ...prefixesMixin,
    }),
    commonBaseFieldConfigurationSchema.keys({
      ...deprecatedAllowNull,
      type: Joi.string().valid('number').default('number'),
      defaultValue: Joi.number(),
      valueOptions: Joi.array().min(1).items(Joi.object().keys({
        text: stringOrTranslationsSchema.required(),
        value: Joi.number().required(),
      })).required(),
      inputType: Joi.string().valid('select').default('select'),
      ...prefixesMixin,
    }),
    commonBaseFieldConfigurationSchema.keys({
      ...deprecatedAllowNull,
      type: Joi.string().valid('integer').required(),
      defaultValue: Joi.number().integer(),
      valueOptions: Joi.array().min(1).items(Joi.object().keys({
        text: stringOrTranslationsSchema.required(),
        value: Joi.number().integer().required(),
      })).required(),
      inputType: Joi.string().valid('select').default('select'),
      ...prefixesMixin,
    }),
    commonBaseFieldConfigurationSchema.keys({
      type: Joi.string().valid('number').default('number'),
      ...deprecatedDefaultValue,
      valueOptions: Joi.array().min(1).items(Joi.object().keys({
        text: stringOrTranslationsSchema.required(),
        value: Joi.number().required(),
      })).required(),
      inputType: Joi.string().valid('radio').required(),
    }),
    commonBaseFieldConfigurationSchema.keys({
      type: Joi.string().valid('integer').required(),
      ...deprecatedDefaultValue,
      valueOptions: Joi.array().min(1).items(Joi.object().keys({
        text: stringOrTranslationsSchema.required(),
        value: Joi.number().integer().required(),
      })).required(),
      inputType: Joi.string().valid('radio').required(),
    }),
    commonBaseFieldConfigurationSchema.keys({
      type: Joi.string().valid('boolean').required(),
      ...deprecatedDefaultValue,
      ...deprecatedValueOptions,
      inputType: Joi.string().valid('switch', 'checkbox').default('checkbox'),
    }),
    commonBaseFieldConfigurationSchema.keys({
      type: Joi.string().valid('boolean').default('boolean'),
      ...deprecatedDefaultValue,
      ...deprecatedValueOptions,
      inputType: Joi.string().valid('switch', 'checkbox').required(),
    }),
    commonBaseFieldConfigurationSchema.keys({
      ...deprecatedAllowNull,
      type: Joi.string().valid('boolean').default('boolean'),
      defaultValue: Joi.boolean(),
      valueOptions: Joi.array().min(1).items(Joi.object().keys({
        text: stringOrTranslationsSchema.required(),
        value: Joi.boolean().required(),
      })).required(),
      inputType: Joi.string().valid('select').default('select'),
      ...prefixesMixin,
    }),
    commonBaseFieldConfigurationSchema.keys({
      type: Joi.string().valid('boolean').default('boolean'),
      ...deprecatedDefaultValue,
      valueOptions: Joi.array().min(1).items(Joi.object().keys({
        text: stringOrTranslationsSchema.required(),
        value: Joi.boolean().required(),
      })).required(),
      inputType: Joi.string().valid('radio').required(),
    }),
    commonBaseFieldConfigurationSchema.keys({
      inputType: Joi.string().valid('file', 'files').required(),
      ...deprecatedValueOptions,
    }),
  )
    .tag('baseFieldConfiguration')
    .description('Defines which data can be stored in form fields.');
};

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

interface SharedBaseFieldConfigurationWithPrefix extends SharedBaseFieldConfiguration {
  prefix?: StringOrTranslations;
  suffix?: StringOrTranslations;
}

interface FieldConfigurationStringText extends SharedBaseFieldConfigurationWithPrefix {
  inputType: 'text' | 'textarea';
  type: 'string';
  defaultValue?: string;
  regex?: string;
}

interface FieldConfigurationStringSelect extends SharedBaseFieldConfigurationWithPrefix {
  inputType: 'select';
  type: 'string';
  defaultValue?: string;
  /**
   * @minItems 1
   */
  valueOptions: ValueOption<string>[];
}

interface FieldConfigurationStringRadio extends SharedBaseFieldConfiguration {
  inputType: 'radio';
  type: 'string';
  /**
   * @minItems 1
   */
  valueOptions: ValueOption<string>[];
}

interface FieldConfigurationNumberText extends SharedBaseFieldConfigurationWithPrefix {
  inputType: 'text';
  type: 'number' | 'integer';
  defaultValue?: number;
  lowerbound?: number;
  upperbound?: number;
}

interface FieldConfigurationNumberSelect extends SharedBaseFieldConfigurationWithPrefix {
  inputType: 'select';
  type: 'number' | 'integer';
  defaultValue?: number;
  /**
   * @minItems 1
   */
  valueOptions: ValueOption<number>[];
}

interface FieldConfigurationNumberRadio extends SharedBaseFieldConfiguration {
  inputType: 'radio';
  type: 'number' | 'integer';
  /**
   * @minItems 1
   */
  valueOptions: ValueOption<number>[];
}

interface FieldConfigurationBooleanSwitch extends SharedBaseFieldConfiguration {
  inputType: 'switch';
  type: 'boolean';
}

interface FieldConfigurationBooleanCheckbox extends SharedBaseFieldConfiguration {
  inputType: 'checkbox';
  type: 'boolean';
}

interface FieldConfigurationBooleanSelect extends SharedBaseFieldConfigurationWithPrefix {
  inputType: 'select';
  type: 'boolean';
  defaultValue?: boolean;
  /**
   * @minItems 1
   */
  valueOptions: ValueOption<boolean>[];
}

interface FieldConfigurationBooleanRadio extends SharedBaseFieldConfiguration {
  inputType: 'radio';
  type: 'boolean';
  /**
   * @minItems 1
   */
  valueOptions: ValueOption<boolean>[];
}

interface FieldConfigurationFile extends SharedBaseFieldConfiguration {
  inputType: 'file';
}

interface FieldConfigurationFiles extends SharedBaseFieldConfiguration {
  inputType: 'files';
}

type BaseFieldConfiguration = FieldConfigurationStringText
  | FieldConfigurationStringSelect
  | FieldConfigurationStringRadio
  | FieldConfigurationNumberText
  | FieldConfigurationNumberSelect
  | FieldConfigurationNumberRadio
  | FieldConfigurationBooleanSwitch
  | FieldConfigurationBooleanCheckbox
  | FieldConfigurationBooleanSelect
  | FieldConfigurationBooleanRadio
  | FieldConfigurationFile
  | FieldConfigurationFiles;

type BaseFieldConfigurations = BaseFieldConfiguration[];

export {
  schema,
  BaseFieldConfiguration,
  BaseFieldConfigurations,
  ValueOption,
};
