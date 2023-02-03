import Joi from 'joi';
import { ControllerGeneratorOptionsWithClient } from '../../comms/controller';
import { schema as fieldsToServerUpdateSchema, FieldsToServerUpdate } from '../../models/fields/fields-to-server-update';
import { schema as pinSchema, Pin } from '../../models/pin';
import { schema as gridSchema, Grid } from '../../models/grid';

interface Request {
  params: {
    hashId: string;
  };
  body: {
    fields?: FieldsToServerUpdate;
    edgeHashId?: string | null;
    pinGridsHashIds?: string[];
  };
}

interface Response {
  pin: Pin;
  grids: Grid[];
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
    pinGridsHashIds: Joi.array().items(Joi.string()),
  }).required(),
  response: Joi.object().keys({
    pin: pinSchema.required(),
    grids: Joi.array().items(gridSchema).required(),
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
