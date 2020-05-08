import Joi from '@hapi/joi';
import { ControllerGeneratorOptions } from '../../comms/controller';
import { fieldsSchema, Fields } from '../../models/field-configuration';

interface Request {
  params: {
    hashId: string;
  };
  body: {
    fields: Fields;
  };
}

interface Response {
  name: string;
}

const controllerGeneratorOptions: ControllerGeneratorOptions = {
  method: 'post',
  path: '/pin/:hashId',
  params: Joi.object().keys({
    hashId: Joi.string().required().example('e13d57'),
  }).required(),
  body: Joi.object().keys({
    fields: fieldsSchema.required().example({ id: 'My connecting point' }),
  }).required(),
  response: Joi.object().keys({
    name: Joi.string().required().example('My connecting point'),
  }).required(),
  right: { environment: 'STATIC' },
  description: 'Updates a specific pin',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
