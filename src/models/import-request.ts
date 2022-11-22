import Joi from 'joi';
import { PinGroup } from './pin-group';
import { EnvironmentReportType } from './environment-report-type';
import { User } from './user';
import { FileFromServer, schema as fileFromServer } from './file-from-server';

type Template = {
  pinGroupHashIds: Array<PinGroup['hashId']>,
  reportTypeHashIds: Array<EnvironmentReportType['hashId']>,
}

// kept internal for now, but not excluded for an export later down the road
const IMPORT_STATES = ['processing', 'invalid', 'errored', 'success'] as const;
type ImportStates = typeof IMPORT_STATES[number];

type BaseImportRequest = {
  name: string
  hashId: string
  createdByHashId: User['hashId']
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date | null
  state: ImportStates
}

/**
  * The import is being processed. There is no file available at that time.
  */
type ProcessingImportRequest = BaseImportRequest & {
  state: 'processing'
}

/**
  * The processing of the import failed early.
  * There could be several reasons for this such as invalid file format
  */
type InvalidImportRequest = BaseImportRequest & {
  state: 'invalid'
  errors: Array<string>
}

/**
  * The processing of the import failed on one or more rows.
  * There is a file available for the provided XLSX file where failed rows
  * have an explanation of the error.
  */
type ErroredImportRequest = BaseImportRequest & {
  state: 'errored'
  file: FileFromServer
  processedAt: Date
}

/**
  * The processing of the import is successful for all rows.
  * There is a file available for the provided XLSX file.
  */
type SuccessfulImportRequest = BaseImportRequest & {
  state: 'success'
  file: FileFromServer
  processedAt: Date
}

type ImportRequest = ProcessingImportRequest
  | InvalidImportRequest
  | ErroredImportRequest
  | SuccessfulImportRequest

const templateSchema = Joi.object().keys({
  pinGroupHashIds: Joi.array().items(Joi.string().required().example('5x2znek')).required(),
  reportTypeHashIds: Joi.array().items(Joi.string().required().example('5x2znek')).required(),
});

const baseImportRequestSchema = (
  extraKeys?: Joi.PartialSchemaMap<any>,
): Joi.ObjectSchema => Joi.object().keys({
  hashId: Joi.string().required().example('5x2znek'),
  name: Joi.string().required().example('Q2 Import Temperature').max(255),
  createdByHashId: Joi.string().required().example('5x2znek'),
  createdAt: Joi.date().required().example('2019-12-31T15:23Z'),
  updatedAt: Joi.date().required().example('2019-12-31T15:23Z'),
  deletedAt: Joi.date().allow(null),
}).keys(extraKeys);

const processingImportRequestSchema = (
  extraKeys?: Joi.PartialSchemaMap<any>,
): Joi.ObjectSchema => baseImportRequestSchema(extraKeys).keys({
  state: Joi.string().valid('processing').required().example('processing'),
});

const invalidImportRequestSchema = (
  extraKeys?: Joi.PartialSchemaMap<any>,
): Joi.ObjectSchema => baseImportRequestSchema(extraKeys).keys({
  state: Joi.string().valid('invalid').required().example('invalid'),
  errors: Joi.array().items(
    Joi.string().required().example('The provided XLSX file is malformed'),
  )
    .required()
    .min(1),
});

const erroredImportRequestSchema = (
  extraKeys?: Joi.PartialSchemaMap<any>,
): Joi.ObjectSchema => baseImportRequestSchema(extraKeys).keys({
  state: Joi.string().valid('errored').required().example('errored'),
  file: fileFromServer.required(),
  processedAt: Joi.date().required().example('2019-12-31T15:23Z'),
});

const successfulImportRequestSchema = (
  extraKeys?: Joi.PartialSchemaMap<any>,
): Joi.ObjectSchema => baseImportRequestSchema(extraKeys).keys({
  state: Joi.string().valid('success').required().example('success'),
  file: fileFromServer.required(),
  processedAt: Joi.date().required().example('2019-12-31T15:23Z'),
});

const importRequestSchema = (
  extraKeys?: Joi.PartialSchemaMap<any>,
): Joi.AlternativesSchema => Joi.alternatives().try(
  processingImportRequestSchema(extraKeys),
  invalidImportRequestSchema(extraKeys),
  erroredImportRequestSchema(extraKeys),
  successfulImportRequestSchema(extraKeys),
).required();

export {
  templateSchema,
  Template,
  ImportStates,
  ProcessingImportRequest,
  InvalidImportRequest,
  ErroredImportRequest,
  SuccessfulImportRequest,
  ImportRequest,
  importRequestSchema,
  processingImportRequestSchema,
  invalidImportRequestSchema,
  erroredImportRequestSchema,
  successfulImportRequestSchema,
};
