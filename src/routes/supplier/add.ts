import Joi from '@hapi/joi';
import { ControllerGeneratorOptions } from '../../comms/controller';
import { schema as supplierSchema, Supplier } from '../../models/supplier';

interface Request {
  body: {
    name: string;
  };
}

interface Response {
  supplier: Supplier;
  supplierRights: string[];
}

const controllerGeneratorOptions: ControllerGeneratorOptions = {
  method: 'post',
  path: '/',
  body: Joi.object().keys({
    name: Joi.string().required().example('My IoT company'),
  }).required(),
  right: {}, // everyone can add a supplier
  response: Joi.object().keys({
    supplier: supplierSchema.required(),
    supplierRights: Joi.array().items(Joi.string()).required().example(['STATIC', 'USERS'])
      .description('See the getting started section about rights'),
  }).required(),
  description: 'Create a supplier to connect new IoT sensor types and other new data sources to our application, which can be used in one or more environments',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
