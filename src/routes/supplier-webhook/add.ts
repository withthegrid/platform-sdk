import Joi from 'joi';
import { ControllerGeneratorOptions } from '../../comms/controller';

import { identifierExample } from '../../models/supplier-certificate';

interface Request {
  body: {
    name: string;
    identifier: string;
  };
}

interface Response {
  hashId: string;
  url: string;
}

const controllerGeneratorOptions: ControllerGeneratorOptions = {
  method: 'post',
  path: '/',
  body: Joi.object().keys({
    name: Joi.string().required().example('My webhook'),
    identifier: Joi.string().required().example(identifierExample).description('A javascript function that returns deviceType and identifier. See the chapter "User defined code"'),
  }).required(),
  right: { supplier: 'ENVIRONMENT_ADMIN' },
  response: Joi.object().keys({
    hashId: Joi.string().required().example('z812a63'),
    url: Joi.string().required().example('https://api.withthegrid.com/iot?s=f1a4w1?t=asd193gaf11234').description('The URL the third party service should use to post data sent by the devices.'),
  }).required(),
  description: 'Add a webhook to the connectivity environment.',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
