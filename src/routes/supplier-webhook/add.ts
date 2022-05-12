import Joi from 'joi';
import { ControllerGeneratorOptionsWithSupplier } from '../../comms/controller';

import { identifierExample } from '../../models/supplier-certificate';

interface Request {
  body: {
    name: string;
    identifier: string;
    shimmable: number;
  };
}

interface Response {
  hashId: string;
  url: string;
  subscriptionHashId?: string;
}

const controllerGeneratorOptions: ControllerGeneratorOptionsWithSupplier = {
  method: 'post',
  path: '/',
  body: Joi.object().keys({
    name: Joi.string().required().example('My webhook'),
    shimmable: Joi.number().required().example(0),
    identifier: Joi.string().max(1000000).required().example(identifierExample)
      .description('A javascript function that returns deviceType and identifier. See the chapter "User defined code"'),
  }).required(),
  right: { supplier: 'ENVIRONMENT_ADMIN' },
  response: Joi.object().keys({
    hashId: Joi.string().required().example('z812a63'),
    url: Joi.string().required().example('https://api.withthegrid.com/iot?s=f1a4w1?t=asd193gaf11234').description('The URL the third party service should use to post data sent by the devices.'),
    subscriptionHashId: Joi.string().description('Right now the user gets automatically subscribed to alerts on this object. This hashId can be used to remove such an alert'),
  }).required(),
  description: 'Add a webhook to the connectivity environment.',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
