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
const IMPORT_STATES = ['processing', 'invalid', 'errored', 'success', 'waiting', 'deleted'] as const;
type ImportStates = typeof IMPORT_STATES[number];

type ImportRequest = {
  name: string
  hashId: string
  userHashId: User['hashId']
  state: ImportStates
  errors: Array<string> | null
  file?: FileFromServer | null
  processedAt: Date | null
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date | null
}

const templateSchema = Joi.object().keys({
  pinGroupHashIds: Joi.array().items(Joi.string().required().example('5x2znek')).required(),
  reportTypeHashIds: Joi.array().items(Joi.string().required().example('5x2znek')).required(),
});

const importRequestSchema = Joi.object().keys({
  state: Joi.string().valid(...IMPORT_STATES).required().example('processing'),
  hashId: Joi.string().required().example('5x2znek'),
  name: Joi.string().required().example('Q2 Import Temperature').max(255),
  userHashId: Joi.string().required().example('5x2znek'),
  createdAt: Joi.date().required().example('2019-12-31T15:23Z'),
  updatedAt: Joi.date().required().example('2019-12-31T15:23Z'),
  deletedAt: Joi.date().allow(null),
  errors: Joi.array().items(
    Joi.string().required().example('The provided XLSX file is malformed'),
  ).allow(null),
  file: fileFromServer.allow(null),
  processedAt: Joi.date().example('2019-12-31T15:23Z').allow(null),
});

export {
  templateSchema,
  Template,
  ImportStates,
  ImportRequest,
  importRequestSchema,
};
