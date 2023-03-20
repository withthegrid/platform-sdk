import Joi from 'joi';
import { ControllerGeneratorOptionsWithClient } from '../../comms/controller';
import { Chart, schema as chartSchema } from '../../models/chart';

type HashId = string;

// 'edgeHashIds', 'gridHashIds'
const kindsHashIds = ['pinGroupHashIds', 'pinHashIds'] as const;
type KindsHashIds = typeof kindsHashIds[number];

// 'edges', 'grids'
const kindsResources = ['pinGroups', 'pins'] as const;
type KindsResources = typeof kindsResources[number];

// We make eveything Partial because having everything required but allowing an empty array does not
// work. The reason is that coming from the consumer, having empty array(s) is valid, then the
// query goes through axios, which strips the empty query arrays. Later, when the platform receives
// the query and validated the requests, the requests does not validates against the schema anymore.
// One alternative would be to add a paramSerializer to axios to force to produce a query param for
// empty arrays. But doing so would annoys Joi because `array[0]` cannot be an empty string.
// So the next best thing we can do is this, allowing empty queries, and anserwing with empty
// responses
type Request = {
  query: Partial<Record<KindsHashIds, Array<HashId>>>;
}

type Panel = {
  lastMode: 'manual' | 'automatic',
  charts: {
    automatic: Chart[],
    manual: Chart[],
  },
};

type Response = Partial<Record<KindsResources, Array<{
  hashId: HashId,
  panel: Panel,
}>>>;

const charts = (apiVersion: number) => Joi.object().keys({
  lastMode: Joi.string().valid('manual', 'automatic').example('automatic').required(),
  charts: Joi.object().keys({
    automatic: Joi.array().items(chartSchema(apiVersion)).required(),
    manual: Joi.array().items(chartSchema(apiVersion)).required(),
  }).required(),
}).required();

const controllerGeneratorOptions: ControllerGeneratorOptionsWithClient = {
  method: 'get',
  path: '/panels',
  query: Joi.object().keys({
    pinGroupHashIds: Joi.array().items(Joi.string().example('dao97')).max(30),
    pinHashIds: Joi.array().items(Joi.string().example('e13d57')).max(30),
  }).required(),
  right: { environment: 'READ' },
  response: (apiVersion: number): Joi.ObjectSchema => Joi.object().keys({
    pinGroups: Joi.array().items(Joi.object().keys({
      hashId: Joi.string().required().example('dao97'),
      panel: charts(apiVersion),
    }).required()),
    pins: Joi.array().items(Joi.object().keys({
      hashId: Joi.string().required().example('e13d57'),
      panel: charts(apiVersion),
    }).required()),
  }),
  description: 'Get multiple chart panels from pinGroups and grids',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
