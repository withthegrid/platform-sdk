import Joi from 'joi';
import { ControllerGeneratorOptionsWithClient } from '../../comms/controller';

import { schema as gridSchema, Grid } from '../../models/grid';
import { schema as pinSchema, Pin } from '../../models/pin';

interface Request {
  params: {
    hashId: string;
  };
}

interface Response {
  grid: Grid;
  pins: Pin[];
  lastReports: {
    pinHashId: string;
    generatedAt: Date;
  }[];
  photo: string | null;
}

const controllerGeneratorOptions: ControllerGeneratorOptionsWithClient = {
  method: 'get',
  path: '/pin-grid/:hashId',
  params: Joi.object().keys({
    hashId: Joi.string().required().example('naud51'),
  }).required(),
  right: { environment: 'READ' },
  response: Joi.object().keys({
    grid: gridSchema.required(),
    pins: Joi.array().items(pinSchema).required(),
    lastReports: Joi.array().items(Joi.object({
      pinHashId: Joi.string().required().example('dao97'),
      generatedAt: Joi.date().required().example('2019-12-31T15:23Z'),
    })).required(),
    photo: Joi.string().allow(null).required().description('download link for photo.')
      .example('https://api.withthegrid.com/file/yr969d...'),
  }).required(),
  description: 'Get a specific grid of type pin identified by its hashId',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
