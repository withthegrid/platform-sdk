import Joi from 'joi';
import { ControllerGeneratorOptionsWithClient } from '../../comms/controller';
import { FileFromServer, schema as fileFromServer } from '../../models/file-from-server';
import { Template } from '../../models/import-request';

type Request = {
  body: Template;
}

type Response = FileFromServer;

const reportTypeSchema = Joi.object().keys({
  hashId: Joi.string().required().example('5x2znek'),
  type: Joi.string().valid('human', 'device').example('human').required(),
});
const controllerGeneratorOptions: ControllerGeneratorOptionsWithClient = {
  method: 'post',
  path: '/template',
  body: Joi.object().keys({
    pinGroupHashIds: Joi.array().items(
      Joi.string().required().example('5x2znek'),
    )
      .required()
      .description('A list of location HashIDs')
      .min(1)
      .max(200),
    reportTypes: Joi.array().items(reportTypeSchema)
      .required()
      .description('A list of report types')
      .min(1)
      .max(5),
  }).required(),
  right: { environment: 'IMPORTS' },
  response: fileFromServer.required(),
  description: 'Generates an import template',
};

export {
  controllerGeneratorOptions,
  Request,
  Response,
  Request as EffectiveRequest,
};
