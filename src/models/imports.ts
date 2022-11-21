import Joi from 'joi';
import { PinGroup } from './pin-group';
import { EnvironmentReportType } from './environment-report-type';

type Template = {
  pinGroupHashIds: Array<PinGroup['hashId']>,
  reportTypeHashIds: Array<EnvironmentReportType['hashId']>,
}

type BaseImport = {
  name: string
  hashId: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
}

/**
  * The import is being processed. There is no link available at that time.
  */
type ProcessingImport = BaseImport & {
  state: 'processing'
}

/**
  * The processing of the import failed early.
  * There could be several reasons for this such as invalid file format
  */
type InvalidImport = BaseImport & {
  state: 'invalid'
  errors: Array<string>
}

/**
  * The processing of the import failed on one or more rows.
  * There is a link available for the provided XLSX file where failed rows
  * have an exaplanation of the error.
  */
type ErroredImport = BaseImport & {
  state: 'errored'
  link: string
  processedAt: Date
}

/**
  * The processing of the import is successful for all rows.
  * There is a link available for the provided XLSX file.
  */
type SuccessfulImport = BaseImport & {
  state: 'success'
  link: string
  processedAt: string
}

type Import = ProcessingImport
  | InvalidImport
  | ErroredImport
  | SuccessfulImport

const templateSchema = Joi.object().keys({
  pinGroupHashIds: Joi.array().items(Joi.string().required().example('xd2rd4')).required(),
  reportTypeHashIds: Joi.array().items(Joi.string().required().example('xd2rd4')).required(),
});

const baseImportSchema = Joi.object().keys({
  hashId: Joi.string().required().example('xd2rd4'),
  name: Joi.string().required().example('Q2 Import Temperature').max(255),
  createdAt: Joi.date().required().example('2019-12-31T15:23Z'),
  updatedAt: Joi.date().required().example('2019-12-31T15:23Z'),
  deletedAt: Joi.date().allow(null),
});

const processingImportSchema = baseImportSchema.keys({
  state: Joi.string().valid('processing').required().example('processing'),
});

const invalidImportSchema = baseImportSchema.keys({
  state: Joi.string().valid('invalid').required().example('invalid'),
  errors: Joi.array().items(
    Joi.string().required().example('The provided XLSX file is malformed'),
  ).required(),
});

const erroredImportSchema = baseImportSchema.keys({
  state: Joi.string().valid('errored').required().example('errored'),
  link: Joi
    .string()
    .description('Only available at status available')
    .example('https://api.withthegrid.com/file/dp53ly?sig=53516c7771191b37352e6636e1d34c3d1038a25157dd9a16d995b2c470e37492&rt=client&rh=wyvzy7&uh=y33lmy'),
  processedAt: Joi.date().required().example('2019-12-31T15:23Z'),
});

const successfulImportSchema = baseImportSchema.keys({
  state: Joi.string().valid('success').required().example('success'),
  link: Joi
    .string()
    .description('Only available at status available')
    .example('https://api.withthegrid.com/file/dp53ly?sig=53516c7771191b37352e6636e1d34c3d1038a25157dd9a16d995b2c470e37492&rt=client&rh=wyvzy7&uh=y33lmy'),
  processedAt: Joi.date().required().example('2019-12-31T15:23Z'),
});

const importSchema = Joi.alternatives().try(
  processingImportSchema,
  invalidImportSchema,
  erroredImportSchema,
  successfulImportSchema,
).required();

export {
  templateSchema,
  Template,
  ProcessingImport,
  InvalidImport,
  ErroredImport,
  SuccessfulImport,
  Import,
  importSchema,
  processingImportSchema,
  invalidImportSchema,
  erroredImportSchema,
  successfulImportSchema,
};
