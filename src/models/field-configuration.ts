import Joi from '@hapi/joi';
import { schema as fileToServerSchema, FileToServer } from './file-to-server';
import { schema as fileFromServerSchema, FileFromServer } from './file-from-server';
import { schema as fileToFieldConfigurationUdfSchema, FileToFieldConfigurationUdf } from './file-to-field-configuration-udf';

type BaseField = boolean | number | string | null | undefined;
type BaseFields = Record<string, BaseField>;

type FieldFromServer = BaseField | FileFromServer | FileFromServer[];
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

// strict(): do not do casting here, otherwise for example a string might end up as a number
const baseFieldSchema = Joi.alternatives().try(
  Joi.boolean().strict().required(),
  Joi.number().strict().required(),
  Joi.string().strict().allow('').required(),
  Joi.any().valid(null).required(),
);

const baseFieldsSchema = Joi.object().pattern(
  Joi.string().required(),
  baseFieldSchema,
);

// strict(): do not do casting here, otherwise for example a string might end up as a number
const fieldFromServerSchema = Joi.alternatives().try(
  Joi.boolean().strict().required(),
  Joi.number().strict().required(),
  Joi.string().strict().allow('').required(),
  fileFromServerSchema.required(),
  Joi.array().items(fileFromServerSchema).required(),
  Joi.any().valid(null).required(),
);

const fieldsFromServerSchema = Joi.object().pattern(
  Joi.string().required(),
  fieldFromServerSchema,
);

// strict(): do not do casting here, otherwise for example a string might end up as a number
const fieldToServerFullSchema = Joi.alternatives().try(
  Joi.boolean().strict().required(),
  Joi.number().strict().required(),
  Joi.string().strict().allow('').required(),
  fileToServerSchema.required(),
  Joi.array().items(fileToServerSchema).required(),
  Joi.any().valid(null).required(),
);

const fieldsToServerFullSchema = Joi.object().pattern(
  Joi.string(),
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
);

const fieldsToServerPartialSchema = Joi.array().items(
  fieldToServerPartialSchema,
);

const fieldsToServerUpdateSchema = Joi.alternatives().try(
  fieldsToServerFullSchema.required(),
  fieldsToServerPartialSchema.required(),
);

// strict(): do not do casting here, otherwise for example a string might end up as a number
const fieldToFieldConfigurationUdfSchema = Joi.alternatives().try(
  Joi.boolean().strict().required(),
  Joi.number().strict().required(),
  Joi.string().strict().allow('').required(),
  fileToFieldConfigurationUdfSchema.required(),
  Joi.array().items(fileToFieldConfigurationUdfSchema).required(),
  Joi.any().valid(null).required(),
);

const fieldsToFieldConfigurationUdfSchema = Joi.object().pattern(
  Joi.string().required(),
  fieldToFieldConfigurationUdfSchema,
);

const baseFieldConfigurationSchema = Joi.object().keys({
  key: Joi.string().pattern(/^[a-z][a-zA-Z\d]*$/).required().example('id'),
  name: Joi.string().required().example('ID as used in our geographic information system'),
  inputType: Joi.valid('text', 'textarea', 'select', 'radio', 'switch', 'checkbox', 'file', 'files')
    .description('The UI component to show.'),
  valueOptions: Joi.array().items(Joi.object().keys({
    text: Joi.string().required(),
    value: baseFieldSchema.required().description('Will be passed through parser'),
  })).allow(null)
    .description('If null, inputType should not be select or radio. If not null, input type should be select or radio'),
  parserTs: Joi.string().description('Parses the input string. Valid TypeScript function with signature ({ raw: boolean | number | string | null | undefined }) => boolean | number | string | null | undefined. Not available for inputTypes \'file\' and \'files\''),
  validatorTs: Joi.string().description('Validates the parsed input. Valid TypeScript function with signature ({ parsed: string, boolean | number | string | null | undefined | FileToFieldConfigurationUdf | FileToFieldConfigurationUdf[], values: Record<string, boolean | number | string | null | undefined | FileToFieldConfigurationUdf  | FileToFieldConfigurationUdf[]> }) => true | string. When true is returned, input is valid. When a string is returned, input is invalid and the string is shown as error.'),
  showTs: Joi.string().description('Determines whether this field should be shown. Valid TypeScript function with signature ({ values: Record<string, boolean | number | string | null | undefined | FileToFieldConfigurationUdf  | FileToFieldConfigurationUdf[]> }) => boolean. Optional fields are hidden when they have no data'),
  headerTs: Joi.string().description('Adds a header before this field (only if this field is shown). Valid TypeScript function with signature ({ value: Record<string, boolean | number | string | null | FileToFieldConfigurationUdf | FileToFieldConfigurationUdf[]> }) => string | false'),
  unparserTs: Joi.string().description('Converts the stored value back to what should be shown in the input field. Is also an opportunity to provide a default value. Valid TypeScript function with signature ({ parsed: string, boolean | number | string | null | undefined, values: Record<string, boolean | number | string | null | undefined | FileToFieldConfigurationUdf | FileToFieldConfigurationUdf[]> }) => boolean | number | string | null | undefined. Not available for inputTypes \'file\' and \'files\''),
  prefix: Joi.string().description('Not available for inputTypes \'radio\', \'switch\', \'checkbox\', \'file\' and \'files\''),
  suffix: Joi.string().description('Not available for inputTypes \'radio\', \'switch\', \'checkbox\', \'file\' and \'files\''),
  hint: Joi.string().allow('').description('As shown near the input field'),
  store: Joi.boolean().default(true).description('If false, the field will not be stored. This is useful to make more elaborate UI\'s where for example a (non-stored) switch determines which other fields to show. Not available for inputTypes \'file\' and \'files\''),
});

const fieldConfigurationToServerSchema = baseFieldConfigurationSchema
  .tag('fieldConfigurationToServer')
  .description('Defines which data can be stored on objects of a certain type. See the open fields chapter for more detail.');

const fieldConfigurationFromServerSchema = baseFieldConfigurationSchema.keys({
  parserJs: Joi.string().description('The JavaScript transpiled version of the TypeScript variant'),
  validatorJs: Joi.string().description('The JavaScript transpiled version of the TypeScript variant'),
  showJs: Joi.string().description('The JavaScript transpiled version of the TypeScript variant'),
  headerJs: Joi.string().description('The JavaScript transpiled version of the TypeScript variant'),
  unparserJs: Joi.string().description('The JavaScript transpiled version of the TypeScript variant'),
})
  .tag('fieldConfigurationFromServer')
  .description('Defines which data can be stored on objects of a certain type. See the open fields chapter for more detail.');

interface ValueOption {
  text: string;
  value: BaseField;
}

interface FieldConfigurationToServer {
  key: string;
  name: string;
  inputType?: 'text' | 'textarea' | 'select' | 'radio' | 'switch' | 'checkbox' | 'file' | 'files';
  valueOptions?: ValueOption[] | null;
  parserTs?: string;
  validatorTs?: string;
  showTs?: string;
  headerTs?: string;
  unparserTs?: string;
  prefix?: string;
  suffix?: string;
  hint?: string;
  store: boolean;
}

interface FieldConfigurationFromServer extends FieldConfigurationToServer {
  parserJs?: string;
  validatorJs?: string;
  showJs?: string;
  headerJs?: string;
  unparserJs?: string;
}

interface UpdatableFieldConfiguration {
  existingKey?: string;
  fieldConfiguration: FieldConfigurationToServer;
}

const updatableFieldConfigurationSchema = Joi.object().keys({
  existingKey: Joi.string().pattern(/^[a-z][a-zA-Z\d]*$/),
  fieldConfiguration: fieldConfigurationToServerSchema.required(),
});

export {
  fieldConfigurationToServerSchema,
  fieldConfigurationFromServerSchema,
  FieldConfigurationToServer,
  FieldConfigurationFromServer,
  updatableFieldConfigurationSchema,
  UpdatableFieldConfiguration,
  BaseField,
  BaseFields,
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
