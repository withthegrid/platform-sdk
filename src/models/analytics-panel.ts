import Joi from 'joi';

import { schema as analyticsQuerySchema, AnalyticsQuery } from './analytics-query';
import { schema as analyticsVisualisationSchema, AnalyticsVisualisation } from './analytics-visualisation';

const columnsPerResolution = {
  lg: 6,
  md: 4,
  sm: 2,
  xs: 1,
};

const layoutItemSchema = (columnsCount: number) => Joi.array().items(Joi.object().keys({
  x: Joi.number().integer().max(columnsCount - 1).required(),
  y: Joi.number().integer().required(),
  width: Joi.number().integer().min(1).max(columnsCount),
  height: Joi.number().integer().min(1).max(4),
}))
  .default(null)
  .allow(null);

const layoutSchema = Joi.object().keys({
  lg: layoutItemSchema(columnsPerResolution.lg),
  md: layoutItemSchema(columnsPerResolution.md),
  sm: layoutItemSchema(columnsPerResolution.sm),
  xs: layoutItemSchema(columnsPerResolution.xs),
});

const schema = Joi.object().keys({
  hashId: Joi.string().required().example('j1iha9'),
  title: Joi.string().required().max(100).example('My dashboard'),
  layout: layoutSchema.default(),
  cards: Joi.array().items(Joi.object().keys({
    title: Joi.string().required().example('My widget'),
    query: analyticsQuerySchema.required(),
    visualisation: analyticsVisualisationSchema.required(),
  })).required(),
})
  .description('An object describing an analytics dashboard.')
  .tag('analyticsPanel');

interface CardPosition {
  x: number;
  y: number;
  width: number;
  height: number;
}

// if null then layout for this resolution should be generated on client
interface AnalyticsPanelLayout {
  lg: CardPosition[] | null; // 1200+ px, 8 columns
  md: CardPosition[] | null; // 996+ px, 6 columns
  sm: CardPosition[] | null; // 600+ px, 4 columns
  xs: CardPosition[] | null; // + px, 2 column
}

interface AnalyticsPanel {
  hashId: string;
  title: string;
  layout: AnalyticsPanelLayout;
  cards: {
    title: string;
    query: AnalyticsQuery;
    visualisation: AnalyticsVisualisation;
  }[];
}

export {
  schema,
  AnalyticsPanel,
  AnalyticsPanelLayout,
  layoutSchema,
  columnsPerResolution,
};
