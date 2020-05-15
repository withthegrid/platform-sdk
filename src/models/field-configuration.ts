import Joi from '@hapi/joi';
import { schema as fileToServerSchema, FileToServer } from './file-to-server';
import { schema as fileToFieldConfigurationUdfSchema, FileToFieldConfigurationUdf } from './file-to-field-configuration-udf';

type BaseField = boolean | number | string | null | undefined;
type BaseFields = Record<string, BaseField>;

type FileFieldFromServer = { fileHashId: string };

type FieldFromServer = BaseField | FileFieldFromServer | FileFieldFromServer[];
type FieldsFromServer = Record<string, FieldFromServer>;

type FieldToServerFull = BaseField | FileToServer | FileToServer[];
type FieldsToServerFull = Record<string, FieldToServerFull>;

type FieldToServerPartial = { key: string; value: FieldToServerFull }
  | { key: string; delete?: string[]; add?: FileToServer[] }
type FieldsToServerPartial = FieldToServerPartial[];

type FieldsToServerUpdate = FieldsToServerFull | FieldsToServerPartial;

type FieldToFieldConfigurationUdf = BaseField | FileToFieldConfigurationUdf
  | FileToFieldConfigurationUdf[];
type FieldsToFieldConfigurationUdf = Record<string, FieldToFieldConfigurationUdf>;

const baseFieldSchema = Joi.alternatives().try(
  Joi.boolean().required(),
  Joi.number().required(),
  Joi.string().required(),
  Joi.any().valid(null).required(),
);

const baseFieldsSchema = Joi.object().pattern(
  Joi.string().required(),
  baseFieldSchema,
);

const fileFieldFromServerSchema = Joi.object().keys({
  fileHashId: Joi.string().required(),
});

const fieldFromServerSchema = Joi.alternatives().try(
  Joi.boolean().required(),
  Joi.number().required(),
  Joi.string().required(),
  fileFieldFromServerSchema.required(),
  Joi.array().items(fileFieldFromServerSchema.required()).required(),
  Joi.any().valid(null).required(),
);

const fieldsFromServerSchema = Joi.object().pattern(
  Joi.string().required(),
  fieldFromServerSchema,
);

const fieldToServerFullSchema = Joi.alternatives().try(
  Joi.boolean().required(),
  Joi.number().required(),
  Joi.string().required(),
  fileToServerSchema.required(),
  Joi.array().items(fileToServerSchema).required(),
  Joi.any().valid(null).required(),
);

const fieldsToServerFullSchema = Joi.object().pattern(
  Joi.string().required(),
  fieldToServerFullSchema,
);

const fieldToServerPartialSchema = Joi.alternatives().try(
  Joi.object().keys({
    key: Joi.string().required(),
    value: fieldToServerFullSchema,
  }),
  Joi.object().keys({
    key: Joi.string().required(),
    delete: Joi.array().items(Joi.string().required()),
    add: Joi.array().items(fileToServerSchema.required()),
  }),
).required();


const fieldsToServerPartialSchema = Joi.object().pattern(
  Joi.string().required(),
  fieldToServerFullSchema,
);

const fieldsToServerUpdateSchema = Joi.alternatives().try(
  fieldsToServerFullSchema.required(),
  fieldsToServerPartialSchema.required(),
);

const fieldToFieldConfigurationUdfSchema = Joi.alternatives().try(
  Joi.boolean().required(),
  Joi.number().required(),
  Joi.string().required(),
  fileToFieldConfigurationUdfSchema.required(),
  Joi.array().items(fileToFieldConfigurationUdfSchema).required(),
  Joi.any().valid(null).required(),
);

const fieldsToFieldConfigurationUdfSchema = Joi.object().pattern(
  Joi.string().required(),
  fieldToFieldConfigurationUdfSchema,
);

const schema = Joi.object().keys({
  key: Joi.string().pattern(/^[a-z][a-zA-Z\d]*$/).required().example('id'),
  name: Joi.string().required().example('ID as used in our geographic information system'),
  inputType: Joi.valid('text', 'textarea', 'select', 'radio', 'switch', 'checkbox', 'file', 'files')
    .description('The UI component to show. When \'file\' or \'files\' is selected, it is not passed through parser, default is ignored.'),
  valueOptions: Joi.array().items(Joi.object().keys({
    text: Joi.string().required(),
    value: baseFieldSchema.required().description('Will be passed through parser'),
  })).allow(null)
    .description('If null, inputType should not be select or radio. If not null, input type should be select or radio'),
  default: Joi.alternatives().try(
    Joi.object().keys({
      type: Joi.string().valid('udf').required().description('Determines how default.value should be interpreted: as a constant value (\'value\'), or as a user defined function (\'udf\').'),
      value: Joi.string().required().description('Will not be passed through parser, but immediately to validator. Valid javascript function with signature ({ values: Record<string, boolean | number | string | null | FileToFieldConfigurationUdf | FileToFieldConfigurationUdf[]>, additionalData: Record<string, any>}) => boolean | number | string | null'),
    }),
    Joi.object().keys({
      type: Joi.string().valid('value').required().description('Determines how default.value should be interpreted: as a constant value (\'value\'), or as a user defined function (\'udf\').'),
      value: baseFieldSchema.required().description('Will not be passed through parser, but immediately to validator.'),
    }),
  ).description('Not available for inputTypes \'file\' or \'files\''),
  parser: Joi.string().description('Parses the input string. Valid javascript function with signature ({ raw: Record<string, string>, object: [tbd]) => boolean | number | string | null'),
  validator: Joi.string().description('Validates the parsed input. Valid javascript function with signature ({ parsed: string, boolean | number | string | null | FileToFieldConfigurationUdf | FileToFieldConfigurationUdf[], values: Record<string, boolean | number | string | null | FileToFieldConfigurationUdf  | FileToFieldConfigurationUdf[]>, additionalData: Record<string,any>}) => true | string. When true is returned, input is valid. When a string is returned, input is invalid and the string is shown as error.'),
  show: Joi.string().description('Determines whether this field should be shown. Valid javascript function with signature (value: Record<string, { value: boolean | number | string | null | FileToFieldConfigurationUdf  | FileToFieldConfigurationUdf[], validationResult: true | string }, object: [tbd]) => \'always\' | \'never\' | \'optional\'. Optional fields are hidden when they have no data'),
  header: Joi.string().description('Adds a header before this field (only if this field is shown). Valid javascript function with signature (value: Record<string, { value: boolean | number | string | null | FileToFieldConfigurationUdf | FileToFieldConfigurationUdf[], validationResult: true | string }, object: [tbd]) => string | false'),
  unparser: Joi.string().description('Converts the stored value back to what should be shown in the input field. Valid javascript function with signature (value: Record<string, { value: boolean | number | string | null | FileToFieldConfigurationUdf | FileToFieldConfigurationUdf[] }, object: [tbd]) => string'),
  prefix: Joi.string().description('Not available for inputTypes \'radio\', \'switch\', \'checkbox\', \'file\' and \'files\''),
  suffix: Joi.string().description('Not available for inputTypes \'radio\', \'switch\', \'checkbox\', \'file\' and \'files\''),
  hint: Joi.string().allow('').description('As shown near the input field'),
})
  .tag('fieldConfiguration')
  .description('Defines which data can be stored on objects of a certain type. See the open fields chapter for more detail.');

interface ValueOption {
  text: string;
  value: BaseField;
}

interface FieldConfiguration {
  key: string;
  name: string;
  inputType?: 'text' | 'textarea' | 'select' | 'radio' | 'switch' | 'checkbox' | 'file' | 'files';
  valueOptions?: ValueOption[] | null;
  default?: { type: 'udf'; value: string } | { type: 'value'; value: BaseField };
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
  updatableFieldConfigurationSchema,
  UpdatableFieldConfiguration,
  BaseField,
  BaseFields,
  FileFieldFromServer,
  FieldFromServer,
  FieldsFromServer,
  FieldToServerFull,
  FieldsToServerFull,
  FieldToServerPartial,
  FieldsToServerPartial,
  FieldsToServerUpdate,
  FieldToFieldConfigurationUdf,
  FieldsToFieldConfigurationUdf,
  baseFieldSchema,
  baseFieldsSchema,
  fileFieldFromServerSchema,
  fieldFromServerSchema,
  fieldsFromServerSchema,
  fieldToServerFullSchema,
  fieldsToServerFullSchema,
  fieldToServerPartialSchema,
  fieldsToServerPartialSchema,
  fieldsToServerUpdateSchema,
  fieldToFieldConfigurationUdfSchema,
  fieldsToFieldConfigurationUdfSchema,
};
