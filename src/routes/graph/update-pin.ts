import Joi from '@hapi/joi';
import { ControllerGeneratorOptions } from '../../comms/controller';
import { schema as fieldsToServerUpdateSchema, FieldsToServerUpdate } from '../../models/fields/fields-to-server-update';
import { schema as pinSchema, Pin } from '../../models/pin';

interface Request {
  params: {
    hashId: string;
  };
  body: {
    fields?: FieldsToServerUpdate;
  };
}

interface Response {
  pin: Pin;
}

const controllerGeneratorOptions: ControllerGeneratorOptions = {
  method: 'post',
  path: '/pin/:hashId',
  params: Joi.object().keys({
    hashId: Joi.string().required().example('e13d57'),
  }).required(),
  body: Joi.object().keys({
    fields: fieldsToServerUpdateSchema.example({ id: 'My connecting point' }),
  }).required(),
  response: Joi.object().keys({
    pin: pinSchema.required(),
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
