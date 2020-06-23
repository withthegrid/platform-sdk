import Joi from '@hapi/joi';
import { ControllerGeneratorOptions } from '../../comms/controller';

import { schema as gridSchema, Grid } from '../../models/grid';
import { schema as pinGroupSchema, PinGroup } from '../../models/pin-group';


interface Request {
  params: {
    hashId: string;
  };
}

interface Response {
  grid: Grid;
  pinGroups: PinGroup[];
  notificationLevel: 0 | 1 | 2 | null;
  photo: string | null;
}


const controllerGeneratorOptions: ControllerGeneratorOptions = {
  method: 'get',
  path: '/grid/:hashId',
  params: Joi.object().keys({
    hashId: Joi.string().required().example('naud51'),
  }).required(),
  right: { environment: 'READ' },
  response: Joi.object().keys({
    grid: gridSchema.required(),
    pinGroups: Joi.array().items(pinGroupSchema).required(),
    notificationLevel: Joi.number().valid(0, 1, 2).allow(null).required()
      .example(0)
      .description('Subscribe to every issue created on a pinGroup in this grid (0), when the issue gets serious (1) or when the issue gets critical (2). If you do not want to receive any notifications, set to null'),
    photo: Joi.string().allow(null).required().description('base64 encoded string')
      .example('iVBORw0KGgoAAAANSUhEUgAAB9AAAAhwCAYAAAB1bKV...'),
  }).required(),
  description: 'Get a specific grid identified by its hashId',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
