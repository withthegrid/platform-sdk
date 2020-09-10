import Joi from 'joi';
import { ControllerGeneratorOptions } from '../../comms/controller';
import { schema as fieldsToServerUpdateSchema, FieldsToServerUpdate } from '../../models/fields/fields-to-server-update';
import { schema as deviceSchema, Device } from '../../models/device';

interface Request {
  params: {
    hashId: string;
  };
  body: {
    fields: FieldsToServerUpdate;
  };
}

interface Response {
  device: Device;
}
const controllerGeneratorOptions: ControllerGeneratorOptions = {
  method: 'post',
  path: '/:hashId',
  params: Joi.object().keys({
    hashId: Joi.string().required().example('j1iha9'),
  }).required(),
  body: Joi.object().keys({
    fields: fieldsToServerUpdateSchema.required().example({}),
  }).required(),
  right: { supplier: 'ENVIRONMENT_ADMIN' },
  response: Joi.object().keys({
    device: deviceSchema.required(),
  }),
  description: 'Update a device.',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
