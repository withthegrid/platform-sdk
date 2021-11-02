import Joi from 'joi';

import { schema as analyticsQuerySchema, AnalyticsQuery } from './analytics-query';
import { schema as analyticsVisualisationSchema, AnalyticsVisualisation } from './analytics-visualisation';

const columnsPerResolution = {
  lg: 24,
  md: 18,
  sm: 12,
  xs: 6,
};

const layoutItemSchema = (columnsCount: number) => Joi.array().items(Joi.object().keys({
  x: Joi.number().integer().max(columnsCount - 1).required(),
  y: Joi.number().integer().required(),
  width: Joi.number().integer().min(6).max(columnsCount),
  height: Joi.number().integer().min(4),
}))
  .default(null)
  .allow(null);

const layoutsSchema = Joi.object().keys({
  lg: layoutItemSchema(columnsPerResolution.lg),
  md: layoutItemSchema(columnsPerResolution.md),
  sm: layoutItemSchema(columnsPerResolution.sm),
  xs: layoutItemSchema(columnsPerResolution.xs),
}).allow(null).empty(null);

const schema = Joi.object().keys({
  hashId: Joi.string().required().example('j1iha9'),
  title: Joi.string().required().max(100).example('My dashboard'),
  layouts: layoutsSchema.default(),
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
interface AnalyticsPanelLayouts {
  lg: CardPosition[] | null;
  md: CardPosition[] | null;
  sm: CardPosition[] | null;
  xs: CardPosition[] | null;
}

interface AnalyticsPanel {
  hashId: string;
  title: string;
  layouts: AnalyticsPanelLayouts;
  cards: {
    title: string;
    query: AnalyticsQuery;
    visualisation: AnalyticsVisualisation;
  }[];
}

export {
  schema,
  AnalyticsPanel,
  AnalyticsPanelLayouts,
  layoutsSchema,
  columnsPerResolution,
};
