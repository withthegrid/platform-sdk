import Joi from 'joi';
import { ControllerGeneratorOptionsWithClient } from '../../comms/controller';

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
  lastReports: {
    pinGroupHashId: string;
    generatedAt: Date;
  }[];
  notificationLevel: 0 | 1 | 2 | null;
  photo: string | null;
}

const controllerGeneratorOptions: ControllerGeneratorOptionsWithClient = {
  method: 'get',
  path: '/pin-group-grid/:hashId',
  params: Joi.object().keys({
    hashId: Joi.string().required().example('naud51'),
  }).required(),
  right: { environment: 'READ' },
  response: Joi.object().keys({
    grid: gridSchema.required(),
    pinGroups: Joi.array().items(pinGroupSchema).required(),
    lastReports: Joi.array().items(Joi.object({
      pinGroupHashId: Joi.string().required().example('dao97'),
      generatedAt: Joi.date().required().example('2019-12-31T15:23Z'),
    })).required(),
    notificationLevel: Joi.number().valid(0, 1, 2).allow(null).required()
      .example(0)
      .description('Subscribe to every issue created on a location (pinGroup) in this grid (0), when the issue gets serious (1) or when the issue gets critical (2). If you do not want to receive any notifications, set to null'),
    photo: Joi.string().allow(null).required().description('download link for photo.')
      .example('https://api.withthegrid.com/file/yr969d...'),
  }).required(),
  description: 'Get a specific grid of type pinGroup identified by its hashId',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
