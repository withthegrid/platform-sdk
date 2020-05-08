import Joi from '@hapi/joi';

type Field = boolean | number | string | null;
type Fields = Record<string, Field>;

const fieldSchema = Joi.alternatives().try(
  Joi.boolean().required(),
  Joi.number().required(),
  Joi.string().required(),
  Joi.any().valid(null).required(),
);

const fieldsSchema = Joi.object().pattern(
  Joi.string().required(),
  fieldSchema,
);

const schema = Joi.object().keys({
  key: Joi.string().pattern(/^[a-z][a-zA-Z\d]*$/).required().example('id'),
  name: Joi.string().required().example('ID as used in our geographic information system'),
  inputType: Joi.valid('text', 'textarea', 'select', 'radio', 'switch', 'checkbox', 'file', 'files')
    .description('The UI component to show. When \'file\' or \'files\' is selected, it is not passed through parser and it\'s value is a FileUpload interface ({ name: string, type: string, size: number, url?: string, data?: string }[]).'),
  valueOptions: Joi.array().items(Joi.object().keys({
    text: Joi.string().required(),
    value: fieldSchema.required().description('Will be passed through parser'),
  })).allow(null)
    .description('If null, inputType should not be select or radio. If not null, input type should be select or radio'),
  default: Joi.alternatives().try(
    Joi.object().keys({
      type: Joi.string().valid('udf').required().description('Determines how default.value should be interpreted: as a constant value (\'value\'), or as a user defined function (\'udf\').'),
      value: Joi.string().required().description('Will not be passed through parser, but immediately to validator. Valid javascript function with signature ({ values: Record<string, boolean | number | string | null | FileUpload>, additionalData: Record<string, any>}) => boolean | number | string | null | FileUpload'),
    }),
    Joi.object().keys({
      type: Joi.string().valid('value').required().description('Determines how default.value should be interpreted: as a constant value (\'value\'), or as a user defined function (\'udf\').'),
      value: fieldSchema.required().description('Will not be passed through parser, but immediately to validator.'),
    }),
  ),
  parser: Joi.string().description('Parses the input string. Valid javascript function with signature ({ raw: Record<string, string>, object: [tbd]) => boolean | number | string | null | FileUpload'),
  validator: Joi.string().description('Validates the parsed input. Valid javascript function with signature ({ parsed: string, boolean | number | string | null | FileUpload, values: Record<string, boolean | number | string | null | FileUpload>, additionalData: Record<string,any>}) => true | string. When true is returned, input is valid. When a string is returned, input is invalid and the string is shown as error.'),
  show: Joi.string().description('Determines whether this field should be shown. Valid javascript function with signature (value: Record<string, { value: boolean | number | string | null | FileUpload, validationResult: true | string }, object: [tbd]) => \'always\' | \'never\' | \'optional\'. Optional fields are hidden when they have no data'),
  header: Joi.string().description('Adds a header before this field (only if this field is shown). Valid javascript function with signature (value: Record<string, { value: boolean | number | string | null | FileUpload, validationResult: true | string }, object: [tbd]) => string | false'),
  unparser: Joi.string().description('Converts the stored value back to what should be shown in the input field. Valid javascript function with signature (value: Record<string, { value: boolean | number | string | null | FileUpload }, object: [tbd]) => string'),
  prefix: Joi.string().description('Not available for inputTypes \'radio\', \'switch\', \'checkbox\', \'file\' and \'files\''),
  suffix: Joi.string().description('Not available for inputTypes \'radio\', \'switch\', \'checkbox\', \'file\' and \'files\''),
  hint: Joi.string().allow('').description('As shown near the input field'),
})
  .tag('fieldConfiguration')
  .description('Defines which data can be stored on objects of a certain type. See the open fields chapter for more detail.');

interface ValueOption {
  text: string;
  value: Field;
}

interface FieldConfiguration {
  key: string;
  name: string;
  inputType?: 'text' | 'textarea' | 'select' | 'radio' | 'switch' | 'checkbox' | 'file' | 'files';
  valueOptions?: ValueOption[] | null;
  default?: { type: 'udf'; value: string } | { type: 'value'; value: Field };
  parser?: string;
  validator?: string;
  show?: string;
  header?: string;
  unparser?: string;
  prefix?: string;
  suffix?: string;
  hint?: string;
}

interface UpdatableFieldConfiguration {
  existingKey?: string;
  fieldConfiguration: FieldConfiguration;
}

const updatableFieldConfigurationSchema = Joi.object().keys({
  existingKey: Joi.string().pattern(/^[a-z][a-zA-Z\d]*$/),
  fieldConfiguration: schema.required(),
});

export {
  schema,
  FieldConfiguration,
  fieldSchema,
  Field,
  fieldsSchema,
  Fields,
  updatableFieldConfigurationSchema,
  UpdatableFieldConfiguration,
};
