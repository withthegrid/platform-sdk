import Joi from 'joi';
import { ControllerGeneratorOptionsWithClient } from '../../comms/controller';
import { FileFromServer, schema as fileFromServer } from '../../models/file-from-server';
import { Template } from '../../models/import-request';

type Request = {
  body: Template;
}

type Response = FileFromServer;

const controllerGeneratorOptions: ControllerGeneratorOptionsWithClient = {
  method: 'post',
  path: '/template',
  body: Joi.object().keys({
    pinGroupHashIds: Joi.array().items(
      Joi.string().required().example('5x2znek'),
    )
      .required()
      .description('A list of location hashIds')
      .min(1)
      .max(200),
    reportTypeHashIds: Joi.array().items(
      Joi.string().required().example('5x2znek').description('Can\t be a device report type'),
    )
      .required()
      .description('A list of report type hashIds')
      .min(1)
      .max(5),
  }).required(),
  right: { environment: 'IMPORT' },
  response: fileFromServer.required(),
  description: 'Generates an import template',
};

export {
  controllerGeneratorOptions,
  Request,
  Response,
  Request as EffectiveRequest,
};
