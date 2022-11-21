import Joi from 'joi';
import { ControllerGeneratorOptionsWithClient } from '../../comms/controller';
import { Import, importSchema } from '../../models/imports';

type Request = {
  params: {
    hashId: string;
  };
}

type Response = Import;

const controllerGeneratorOptions: ControllerGeneratorOptionsWithClient = {
  method: 'get',
  path: '/:hashId',
  params: Joi.object().keys({
    hashId: Joi
      .string()
      .required()
      .example('xd2rd4')
      .description('The HashID for the import to be retrieved'),
  }).required(),
  right: { environment: 'IMPORTS' },
  response: importSchema,
  description: 'Returns an import',
};

export {
  controllerGeneratorOptions,
  Request,
  Response,
  Request as EffectiveRequest,
};
