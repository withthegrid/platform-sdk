import Joi from 'joi';
import { ControllerGeneratorOptionsWithClient } from '../../comms/controller';
import { User } from '../../models/user';
import { ImportRequest, importRequestSchema } from '../../models/import-request';

type Request = {
  params: {
    hashId: string;
  };
}

type Response = ImportRequest & {
  createdByUsername: User['name'];
};

const controllerGeneratorOptions: ControllerGeneratorOptionsWithClient = {
  method: 'get',
  path: '/:hashId',
  params: Joi.object().keys({
    hashId: Joi
      .string()
      .required()
      .example('5x2znek')
      .description('The HashID for the import to be retrieved'),
  }).required(),
  right: { environment: 'IMPORT' },
  response: importRequestSchema,
  description: 'Returns an import',
};

export {
  controllerGeneratorOptions,
  Request,
  Response,
  Request as EffectiveRequest,
};
