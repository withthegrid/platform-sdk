import Joi from 'joi';
import { ControllerGeneratorOptionsWithClient } from '../../comms/controller';
import {
  ProcessingImport,
  processingImportSchema,
  InvalidImport,
  invalidImportSchema,
} from '../../models/imports';
import { B64XLSXFile, b64XLSXFile } from './types';

type Request = {
  body: {
    dataUrl: B64XLSXFile;
    /**
      * name override for the import.
      * Defaults to filename
      */
    name?: string | null;
  };
}

type Response = ProcessingImport | InvalidImport;

const controllerGeneratorOptions: ControllerGeneratorOptionsWithClient = {
  method: 'post',
  path: '/',
  body: Joi.object().keys({
    dataUrl: b64XLSXFile
      .required()
      .description('A base64 encoded XLSX file'),
    name: Joi
      .string()
      .allow(null)
      .example('Q2 Import Temperature')
      .description('A name override for the import'),
  }).required(),
  right: { environment: 'IMPORTS' },
  response: Joi.alternatives().try(
    processingImportSchema,
    invalidImportSchema,
  ),
  description: 'Uploads an import file',
};

export {
  controllerGeneratorOptions,
  Request,
  Response,
  Request as EffectiveRequest,
};
