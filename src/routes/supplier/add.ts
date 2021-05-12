import Joi from 'joi';
import { ControllerGeneratorOptionsWithoutClientOrSupplier } from '../../comms/controller';
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

const controllerGeneratorOptions: ControllerGeneratorOptionsWithoutClientOrSupplier = {
  method: 'post',
  path: '/',
  body: Joi.object().keys({
    name: Joi.string().required().example('My connectivity environment'),
  }).required(),
  right: {}, // all logged in users
  response: Joi.object().keys({
    supplier: supplierSchema.required(),
    supplierRights: Joi.array().items(Joi.string()).required().example(['STATIC', 'USERS'])
      .description('See the getting started section about rights'),
  }).required(),
  description: 'Create a connectivity environment to connect external systems and individual IoT devices to our application, which can be used in one or more monitoring environments',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
