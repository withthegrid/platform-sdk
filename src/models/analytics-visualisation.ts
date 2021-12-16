import Joi from 'joi';

const schema = Joi.object().keys({
  type: Joi.string().example('line').required(),
  colors: Joi.array().items(Joi.string().example('#202f0c')).required(),
  xAxisColumnIndex: Joi.number().integer().example(null).allow(null)
    .required(),
  forceOrdinal: Joi.boolean().example(false).required(),
  showAllXAxisLabels: Joi.boolean().example(false).required(),
})
  .description('An object describing the visualisation of the results of an analytics query.')
  .tag('analyticsVisualisation');

interface AnalyticsVisualisation {
  type: string;
  colors: string[];
  xAxisColumnIndex: number | null;
  forceOrdinal: boolean;
  showAllXAxisLabels: boolean;
}

export {
  schema,
  AnalyticsVisualisation,
};
