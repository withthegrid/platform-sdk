import Joi from 'joi';

const graphVisualisationSchema = Joi.object().keys({
  type: Joi.string().example('line').valid('line', 'scatter', 'stacked-bar', 'clustered-bar').required(),
  colors: Joi.array().items(Joi.string().example('#202f0c')).required(),
  xAxisColumnIndex: Joi.number().integer().example(null).allow(null)
    .required(),
  forceOrdinal: Joi.boolean().example(false).required(),
  showAllXAxisLabels: Joi.boolean().example(false).default(false),
});

const mapVisualisationSchema = Joi.object().keys({
  type: Joi.string().example('map').valid('map').required(),
  latitudeColumnIndex: Joi.number().integer().example(0)
    .required(),
  longitudeColumnIndex: Joi.number().integer().example(0)
    .required(),
  colorColumnIndex: Joi.number().integer().example(0).allow(null)
    .required(),
  tooltipColumnIndex: Joi.number().integer().example(0).allow(null)
    .required(),
  mapLayerKey: Joi.string().example('base').required(),
});

const tableVisualisationSchema = Joi.object().keys({
  type: Joi.string().example('table').valid('table').required(),
  colors: Joi.array().items(Joi.string().example('#202f0c')),
  xAxisColumnIndex: Joi.number().integer().example(null).allow(null),
  forceOrdinal: Joi.boolean().example(false),
  showAllXAxisLabels: Joi.boolean().example(false).default(false),
});

const schema = Joi.alternatives().try(
  graphVisualisationSchema,
  mapVisualisationSchema,
  tableVisualisationSchema,
)
  .description('An object describing the visualisation of the results of an analytics query.')
  .tag('analyticsVisualisation')
  .meta({ className: 'analyticsVisualisation' });

interface TableAnalyticsVisualisation {
  type: 'table';
  colors?: string[];
  xAxisColumnIndex?: number | null;
  forceOrdinal?: boolean;
  showAllXAxisLabels?: boolean;
}

interface GraphVisualisation {
  type: 'line' | 'scatter' | 'stacked-bar' | 'clustered-bar';
  colors: string[];
  xAxisColumnIndex: number | null;
  forceOrdinal: boolean;
  showAllXAxisLabels: boolean;
}

interface MapsVisualisation {
  type: 'map';
  latitudeColumnIndex: number;
  longitudeColumnIndex: number;
  colorColumnIndex: number | null;
  tooltipColumnIndex: number | null;
  mapLayerKey: string;
}

type AnalyticsVisualisation = TableAnalyticsVisualisation | GraphVisualisation | MapsVisualisation;

export {
  schema,
  AnalyticsVisualisation,
  GraphVisualisation,
  TableAnalyticsVisualisation,
  MapsVisualisation,
};
