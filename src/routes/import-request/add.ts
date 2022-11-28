import Joi from 'joi';
import { ControllerGeneratorOptionsWithClient } from '../../comms/controller';
import { User } from '../../models/user';
import { FileToServer, schema as fileToServer } from '../../models/file-to-server';
import {
  WaitingImportRequest,
  waitingImportRequestSchema,
} from '../../models/import-request';

type Request = {
  body: Required<FileToServer>;
}

type Response = (WaitingImportRequest) & {
  createdByUsername: User['name'];
};

const controllerGeneratorOptions: ControllerGeneratorOptionsWithClient = {
  method: 'post',
  path: '/',
  body: fileToServer
    .options({ presence: 'required' })
    .required(),
  right: { environment: 'IMPORTS' },
  response:
    waitingImportRequestSchema({
      createdByUsername: Joi.string().required().example('John Doe'),
    }),
  description: 'Uploads an import file',
};

export {
  controllerGeneratorOptions,
  Request,
  Response,
  Request as EffectiveRequest,
};
