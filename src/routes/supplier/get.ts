import Joi from 'joi';
import { ControllerGeneratorOptionsWithoutClientOrSupplier } from '../../comms/controller';

import { schema as supplierSchema, Supplier } from '../../models/supplier';

interface Request {
  params: {
    hashId: string;
  };
}

interface Response {
  supplier: Supplier;
  supplierRights: string[];
  environmentLogo: string | null;
}

const controllerGeneratorOptions: ControllerGeneratorOptionsWithoutClientOrSupplier = {
  method: 'get',
  path: '/:hashId',
  params: Joi.object().keys({
    hashId: Joi.string().required().example('f1a4w1'),
  }).required(),
  right: {},
  response: Joi.object().keys({
    supplier: supplierSchema.required(),
    supplierRights: Joi.array().items(Joi.string()).required().example(['STATIC', 'USERS'])
      .description('See the getting started section about rights'),
    environmentLogo: Joi.string().allow(null).required().description('download link for photo.')
      .example('https://api.withthegrid.com/file/yr969d...'),
  }).required(),
  description: 'Get a specific connectivity environment identified by its hashId',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
