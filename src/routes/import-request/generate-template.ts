import Joi from 'joi';
import { ControllerGeneratorOptionsWithClient } from '../../comms/controller';
import { FileFromServer, schema as fileToServer } from '../../models/file-from-server';
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
      .description('A list of location HashIDs'),
    reportTypeHashIds: Joi.array().items(
      Joi.string().required().example('5x2znek'),
    )
      .required()
      .description('A list of report type HashIDs'),
  }).required(),
  right: { environment: 'IMPORTS' },
  response: fileToServer.required(),
  description: 'Generates an import template',
};

export {
  controllerGeneratorOptions,
  Request,
  Response,
  Request as EffectiveRequest,
};
