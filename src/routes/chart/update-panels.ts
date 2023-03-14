import Joi from 'joi';
import { ControllerGeneratorOptionsWithClient } from '../../comms/controller';

type HashId = string;

// 'edges', 'grids'
const kindsResources = ['pinGroups', 'pins'] as const;
type KindsResources = typeof kindsResources[number];

type Chart = {
  title: string | null;
  series: Array<{
    quantityHashId: HashId;
    pinHashId: HashId;
    color: string | null;
  }>
};

type Panel = {
  lastMode?: 'manual' | 'automatic',
  manualCharts?: Chart[],
};

type Request = {
  body: Record<KindsResources, Array<{
    hashId: HashId,
    panel: Panel,
  }>>
};

type Response = void;

const panel = Joi.object().keys({
  lastMode: Joi.string().valid('manual', 'automatic'),
  manualCharts: Joi.array().items(Joi.object().keys({
    title: Joi.string().allow(null).example(null).required(),
    series: Joi.array().max(40).items(Joi.object().keys({
      quantityHashId: Joi.string().required().example('sajia1'),
      pinHashId: Joi.string().required().example('e13d57'),
      color: Joi.string().example('#ff0000').description('A hex color string').allow(null)
        .default(null),
    })).required(),
  })),
});

const controllerGeneratorOptions: ControllerGeneratorOptionsWithClient = {
  method: 'post',
  path: '/panels',
  body: Joi.object().keys({
    pinGroups: Joi.array().items(Joi.object().keys({
      hashId: Joi.string().required().example('dao97'),
      panel: panel.required(),
    }).required()).required(),
    pins: Joi.array().items(Joi.object().keys({
      hashId: Joi.string().required().example('e13d57'),
      panel: panel.required(),
    }).required()).required(),
  }).required(),
  right: { environment: 'REPORTS' },
  description: 'Update multiple chart panels',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
