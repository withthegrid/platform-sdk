import { ControllerGeneratorOptionsWithClient } from '../../comms/controller';
import { User } from '../../models/user';
import { FileToServer, schema as fileToServer } from '../../models/file-to-server';
import {
  ImportRequest,
  importRequestSchema,
} from '../../models/import-request';

type Request = {
  body: Required<FileToServer>;
}

type Response = (ImportRequest) & {
  createdByUsername: User['name'];
};

const controllerGeneratorOptions: ControllerGeneratorOptionsWithClient = {
  method: 'post',
  path: '/',
  body: fileToServer
    .options({ presence: 'required' })
    .required(),
  right: { environment: 'IMPORT' },
  response:
    importRequestSchema,
  description: 'Uploads an import file',
};

export {
  controllerGeneratorOptions,
  Request,
  Response,
  Request as EffectiveRequest,
};
