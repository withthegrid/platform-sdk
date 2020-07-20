import Joi from '@hapi/joi';
import { ControllerGeneratorOptions } from '../../comms/controller';

import { schema as supplierSchema, Supplier } from '../../models/supplier';

interface Request {
  params: {
    hashId: string;
  };
}

interface Response {
  supplier: Supplier;
  supplierRights: string[];
}

const controllerGeneratorOptions: ControllerGeneratorOptions = {
  method: 'get',
  path: '/:hashId',
  params: Joi.object().keys({
    hashId: Joi.string().required().example('f1a4w1'),
  }).required(),
  right: {}, // supplierHashId in header is irrelevant
  response: Joi.object().keys({
    supplier: supplierSchema.required(),
    supplierRights: Joi.array().items(Joi.string()).required().example(['STATIC', 'USERS'])
      .description('See the getting started section about rights'),
  }).required(),
  description: 'Get a specific supplier identified by its hashId',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
