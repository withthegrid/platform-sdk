import Joi from 'joi';
import { ControllerGeneratorOptionsWithClient } from '../../comms/controller';
import { Template } from '../../models/imports';
import { B64XLSXFile, b64XLSXFile } from './types';

type Request = {
  body: Template;
}

type Response = {
  dataUrl: B64XLSXFile;
};

const controllerGeneratorOptions: ControllerGeneratorOptionsWithClient = {
  method: 'post',
  path: '/template',
  body: Joi.object().keys({
    pinGroupHashIds: Joi.array().items(
      Joi.string().required().example('xd2rd4'),
    )
      .required()
      .description('A list of location HashIDs'),
    reportTypeHashIds: Joi.array().items(
      Joi.string().required().example('xd2rd4'),
    )
      .required()
      .description('A list of report type HashIDs'),
  }).required(),
  right: { environment: 'IMPORTS' },
  response: Joi.object().keys({
    dataUrl: b64XLSXFile.required(),
  }),
  description: 'Generates an import template',
};

export {
  controllerGeneratorOptions,
  Request,
  Response,
  Request as EffectiveRequest,
};
