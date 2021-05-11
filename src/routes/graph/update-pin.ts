import Joi from 'joi';
import { ControllerGeneratorOptionsWithClient } from '../../comms/controller';
import { schema as fieldsToServerUpdateSchema, FieldsToServerUpdate } from '../../models/fields/fields-to-server-update';
import { schema as pinSchema, Pin } from '../../models/pin';

interface Request {
  params: {
    hashId: string;
  };
  body: {
    fields?: FieldsToServerUpdate;
    edgeHashId?: string | null;
  };
}

interface Response {
  pin: Pin;
}

const controllerGeneratorOptions: ControllerGeneratorOptionsWithClient = {
  method: 'post',
  path: '/pin/:hashId',
  params: Joi.object().keys({
    hashId: Joi.string().required().example('e13d57'),
  }).required(),
  body: Joi.object().keys({
    fields: fieldsToServerUpdateSchema.example({ id: 'My port' }),
    edgeHashId: Joi.string().allow(null).example('ka08d'),
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
