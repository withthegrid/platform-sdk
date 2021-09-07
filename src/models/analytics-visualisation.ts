import Joi from 'joi';

const schema = Joi.object().keys({
  type: Joi.string().required(),
  colors: Joi.array().items(Joi.string()).required(),
  xAxisColumnIndex: Joi.number().integer().allow(null).required(),
  forceOrdinal: Joi.boolean().required(),
})
  .description('An object describing the visualisation of the results of an analytics query.')
  .tag('analyticsVisualisation');

interface AnalyticsVisualisation {
  type: string;
  colors: string[];
  xAxisColumnIndex: number | null;
  forceOrdinal: boolean;
}

export {
  schema,
  AnalyticsVisualisation,
};
