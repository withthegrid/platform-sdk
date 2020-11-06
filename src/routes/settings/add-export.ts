import Joi from 'joi';
import { ControllerGeneratorOptions } from '../../comms/controller';
import { Content, contentSchema } from '../../models/export-request';

interface Request {
  body: {
    content: Content;
    delimiter: ',' | ';';
    rowDelimiter: '\n' | '\r\n';
  };
}

interface Response {
  hashId: string;
}

const controllerGeneratorOptions: ControllerGeneratorOptions = {
  method: 'post',
  path: '/export',
  body: Joi.object().keys({
    content: contentSchema.required(),
    delimiter: Joi.string().valid(',', ';').required().example(','),
    rowDelimiter: Joi.string().valid('\n', '\r\n').required().example('\n'),
  }).required(),
  right: { environment: 'EXPORT' },
  response: Joi.object().keys({
    hashId: Joi.string().required().example('maay1'),
  }).required(),
  description: 'Request the creation of a zip file containing a data export',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
