import Joi from 'joi';

const baseGraphVisualisationSchema = Joi.object().keys({
  colors: Joi.array().items(Joi.string().example('#202f0c')).required(),
  xAxisColumnIndex: Joi.number().integer().example(null).allow(null)
    .required(),
  forceOrdinal: Joi.boolean().example(false).required(),
  showAllXAxisLabels: Joi.boolean().example(false).default(false),
});

const lineChartGraphVisualisationSchema = baseGraphVisualisationSchema.keys({
  type: Joi.string().example('line').valid('line', 'scatter').required(),
  yMin: Joi.number().allow(null).example(10).default(null),
  yMax: Joi.number().allow(null).example(10).default(null),
});

const barChartGraphVisualisationSchema = baseGraphVisualisationSchema.keys({
  type: Joi.string().example('line').valid('stacked-bar', 'clustered-bar').required(),
});

const graphVisualisationSchema = Joi.alternatives().try(
  lineChartGraphVisualisationSchema,
  barChartGraphVisualisationSchema,
);

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
});

const schema = Joi.alternatives().try(
  graphVisualisationSchema,
  mapVisualisationSchema,
  tableVisualisationSchema,
)
  .description('An object describing the visualisation of the results of an analytics query.')
  .tag('analyticsVisualisation')
  .meta({ className: 'analyticsVisualisation' });

type BaseChart = {
  colors: string[];
  xAxisColumnIndex: number | null;
  forceOrdinal: boolean;
  showAllXAxisLabels: boolean;
}

type LineChartVisualisation = BaseChart & {
  type: 'line' | 'scatter';
  yMin: number | null;
  yMax: number | null;
}

type BarChartVisualisation = BaseChart & {
  type: 'stacked-bar' | 'clustered-bar';
}

type GraphVisualisation = LineChartVisualisation | BarChartVisualisation;

interface TableAnalyticsVisualisation {
  type: 'table';
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
  LineChartVisualisation,
  BarChartVisualisation,
  GraphVisualisation,
  TableAnalyticsVisualisation,
  MapsVisualisation,
};
