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

type ProcessingImport = BaseImport & {
  state: 'processing'
}

type InvalidImport = BaseImport & {
  state: 'invalid'
}

type ErroredImport = BaseImport & {
  state: 'errored'
  link: string
  processedAt: Date
}

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
