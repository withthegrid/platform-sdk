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
  allowNull: Joi.any().forbidden(),
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
    defaultValue: Joi.string().allow(''),
    valueOptions: Joi.array().items(Joi.any()).length(0).allow(null)
      .default(null),
    inputType: Joi.string().valid('text', 'textarea').default('text'),
    regex: Joi.string(),
    allowNull: Joi.boolean(),
    ...prefixesMixin,
  }).xor('defaultValue', 'allowNull'),
  commonSchema.keys({
    type: Joi.string().valid('string').default('string'),
    defaultValue: Joi.string().allow(''),
    valueOptions: Joi.array().min(1).items(Joi.object().keys({
      text: stringOrTranslationsSchema.required(),
      value: Joi.string().allow('').required(),
    })).required(),
    inputType: Joi.string().valid('select').default('select'),
    allowNull: Joi.boolean(),
    ...prefixesMixin,
  }).xor('defaultValue', 'allowNull'),
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
    defaultValue: Joi.number(),
    valueOptions: Joi.array().items(Joi.any()).length(0).allow(null)
      .default(null),
    inputType: Joi.string().valid('text').default('text'),
    lowerbound: Joi.number().description('If provided, type should be number or integer and provided value should not be lower than this value'),
    upperbound: Joi.number().description('If provided, type should be number or integer and provided value should not be higher than this value'),
    allowNull: Joi.boolean(),
    ...prefixesMixin,
  }).xor('defaultValue', 'allowNull'),
  commonSchema.keys({
    type: Joi.string().valid('number').default('number'),
    defaultValue: Joi.number(),
    valueOptions: Joi.array().min(1).items(Joi.object().keys({
      text: stringOrTranslationsSchema.required(),
      value: Joi.number().required(),
    })).required(),
    inputType: Joi.string().valid('select').default('select'),
    allowNull: Joi.boolean(),
    ...prefixesMixin,
  }).xor('defaultValue', 'allowNull'),
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
    allowNull: Joi.boolean(),
    ...prefixesMixin,
  }).xor('defaultValue', 'allowNull'),
  commonSchema.keys({
    type: Joi.string().valid('integer').required(),
    defaultValue: Joi.number().integer().default(0),
    valueOptions: Joi.array().min(1).items(Joi.object().keys({
      text: stringOrTranslationsSchema.required(),
      value: Joi.number().integer().required(),
    })).required(),
    inputType: Joi.string().valid('select').default('select'),
    allowNull: Joi.boolean(),
    ...prefixesMixin,
  }).xor('defaultValue', 'allowNull'),
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
    allowNull: Joi.boolean(),
    ...prefixesMixin,
  }).xor('defaultValue', 'allowNull'),
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

// https://www.typescriptlang.org/play?ssl=53&ssc=12&pln=48&pc=1#code/C4TwDgpgBAShCOBXAlgJwgQWAGQgQwGdgB5AOwgB4AVAGigGkIQCoIAPYCUgExYGsmAewBmUKlAC8UASBFiAfJICwAKCjqoABWQBjPtToBRNjoA2ibpRlzaDJgXnzVGqADIoAb2cuNAbXpQyKR2zAC6ALQA-ABcsAgo6NwU2noGDI5uWniowMh4psm6+rbGZhaUjMx09I5OahoAvv72oaqqQZyowng60ACyXIgAkpwAtp7eucCmELFEqEEA5gDc3jqCo2CC5KTAMVCkiKMARhCoq-VmRfuHJ2cX6rrbc8ALpCuqDW0qoJBQAMKmIrEVD-DZbHbASRxJBoTA4fBEMiUAaHEYQUZ0ADkVz0WKgAB8oDjwdsuMAsXVVOtSEQoAB3ZDAAAWYM2ZN2sUBwNBpMh0K89XUUxmsQARJwiGKaN51Ot2ZDYgBWABMMqFgRp4qepDFn2+NLpjJZ3L0XKBehBbIh5IFsqgItmUAlECl6pcuL4yoALO6NDrtTS9Sovipqds6WdUIJUAB1JnMgByEATZ3NPOtHKhUkFLkd4slwGl9oDzp1wdD4dpUNIgkMqGjcYTACFBCz05beQrbTn7fnnYXixrPT6-XK+eTYirfSWtWWg-qwypDVCozH4yzWyzY8yuMiABKEWPR95UcBO018K0T3Z2jX9l1u+0jqBKmfDm-AcUEZmCRCmbgoFOA4jlOVAoF3dAhxcUsxXLRdvl+aA4FhdAyFMEBkTSSoWHYTgeH4IRRHEKRrGIxQJHtFJiiMExzEsCgyLEap7Ece13A8KB-ECYIcIiGJ7RcFCEggJJqOwtiNRcdxNGyXJ8goOB1lQJJSnoip7GqeQ6EQHgIGEIJRMklwmj4xDzygdDMPIS9r27W8pGEuErKw1FhjGbFPXxIkSXsikqWXCMazrBt1wTFzyFiCKIFsrsbQciZ7yZUUB1dIsxygF8lQAZnfGC5zghcQwNILWFCptNzbZkotIDDkVizN+V7JLpidR90ufC0vVfXKMvleKvx6jLYPg4ql1UAB6CaxGZZAWA6M5ul6BlkFMUwgOgRACFEh1BAdBY9Es2rrJirqsEa20Oj2-JTEERl3igPBgkEY4ACsIB0KFjWZICqvUdpdkWnpoEvNz0XGXMHWSp15iWB5Mq62JbjA+HS1h94LkrQLqwgwgtx+5q82hgs0ugjQsry8nPynSnHgK0asamqBEz2tdwNOHQ8C26B2F6AgWDAaNIByZBXUe9AoG2DCoG4Oabrunb6V3YJZfQT7pcIAhkEWUglke563o+qEgU6fIoCrOkxjADs+DBsZoWZPGqu+JmWbKxsZddMAmWgK3Hs+xAbpAXGADc9eOP6Oa57axAAZUl47pFrekWBZPAoT9ubHoBLq7Yxc3sctg6+CGXZBAwNa7qWfGarqmyursgboSt1QgA
type RequireOnlyOne<T, Keys extends keyof T> =
  Pick<T, Exclude<keyof T, Keys>>
  & { [K in Keys]-?:
  Required<Pick<T, K>>
  & Partial<Record<Exclude<Keys, K>, undefined>>
}[Keys];

type BaseFieldConfiguration = (RequireOnlyOne<{
  type: 'string';
  /**
   * @default ""
   */
  defaultValue?: string;
  /**
   * @default null
   */
  valueOptions: null | [];
  /**
   * @default "text"
   */
  inputType: 'text' | 'textarea';
  regex?: string;
  allowNull?: boolean;
}, 'defaultValue' | 'allowNull'> & PrefixMixin | RequireOnlyOne<{
  type: 'string';
  /**
   * @default ""
   */
  defaultValue?: string;
  /**
   * @minItems 1
   */
  valueOptions: ValueOption<string>[];
  /**
   * @default "select"
   */
  inputType: 'select';
  allowNull?: boolean;
}, 'defaultValue' | 'allowNull'> & PrefixMixin | {
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
} | RequireOnlyOne<{
  type: 'number';
  /**
   * @default 0
   */
  defaultValue?: number;
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
  allowNull?: boolean;
}, 'defaultValue' | 'allowNull'> & PrefixMixin | RequireOnlyOne<{
  type: 'number';
  /**
   * @default 0
   */
  defaultValue?: number;
  /**
   * @minItems 1
   */
  valueOptions: ValueOption<number>[];
  /**
   * @default "select"
   */
  inputType: 'select';
  allowNull?: boolean;
}, 'defaultValue' | 'allowNull'> & PrefixMixin | {
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
} | RequireOnlyOne<{
  type: 'integer';
  /**
   * @default 0
   */
  defaultValue?: integer;
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
  allowNull?: boolean;
}, 'defaultValue' | 'allowNull'> & PrefixMixin | RequireOnlyOne<{
  type: 'integer';
  /**
   * @default 0
   */
  defaultValue?: integer;
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
  allowNull?: boolean;
}, 'defaultValue' | 'allowNull'> & PrefixMixin | {
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
} | RequireOnlyOne<{
  type: 'boolean';
  /**
   * @default false
   */
  defaultValue?: boolean;
  /**
   * @minItems 1
   */
  valueOptions: ValueOption<boolean>[];
  /**
   * @default "select"
   */
  inputType: 'select';
  allowNull?: boolean;
}, 'defaultValue' | 'allowNull'> & PrefixMixin | {
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
