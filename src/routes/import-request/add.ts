import Joi from 'joi';
import { ControllerGeneratorOptionsWithClient } from '../../comms/controller';
import { FileToServer, schema as fileToServer } from '../../models/file-to-server';
import {
  ImportRequest,
  importRequestSchema,
} from '../../models/import-request';

type Request = {
  body: Required<FileToServer>;
}

interface Response {
  importRequest: ImportRequest;
  createdByUserName: string;
}

const controllerGeneratorOptions: ControllerGeneratorOptionsWithClient = {
  method: 'post',
  path: '/',
  body: fileToServer
    .options({ presence: 'required' }) // Makes the inner fields required.
    .required(),
  right: { environment: 'IMPORT' },
  response:
    Joi.object().keys({
      importRequest: importRequestSchema.required(),
      createdByUserName: Joi.string().required().example('John Doe'),
    }).required(),
  description: 'Uploads an import file',
};

export {
  controllerGeneratorOptions,
  Request,
  Response,
  Request as EffectiveRequest,
};
