import Joi from '@hapi/joi';
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

interface ValueOption {
  text: string;
  value: BaseField;
}

interface BaseFieldConfiguration {
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

export {
  schema,
  BaseFieldConfiguration,
};
