import Joi from 'joi';

import { schema as analyticsQuerySchema, AnalyticsQuery } from './analytics-query';
import { schema as analyticsVisualisationSchema, AnalyticsVisualisation } from './analytics-visualisation';

const columnsCount = 6;

const layoutSchema = Joi.array().items(Joi.object().keys({
  x: Joi.number().integer().max(columnsCount - 1).required(),
  y: Joi.number().integer().required(),
  width: Joi.number().integer().min(2).max(columnsCount),
  height: Joi.number().integer().min(4),
}))
  .custom((layout: CardPosition[], helper) => {
    const rowWidth = columnsCount;
    const matrix: number[][] = [];
    function pushRows(newLength: number) {
      let i = newLength - matrix.length;
      while (i > 0) {
        const row: number[] = [];
        row.length = rowWidth;
        row.fill(-1);
        matrix.push(row);
        i -= 1;
      }
    }
    function insertRectangle(x: number, y: number, w: number, h: number, index: number): number {
      if (matrix.length < y + h + 1) {
        pushRows(y + h + 1);
      }
      for (let row = y; row < y + h; row += 1) {
        for (let col = x; col < x + w; col += 1) {
          if (matrix[row][col] === -1) {
            matrix[row][col] = index;
          } else {
            return matrix[row][col];
          }
        }
      }
      return -1;
    }

    for (let index = 0; index < layout.length; index += 1) {
      const {
        x, y, width, height,
      } = layout[index];
      const overlappingIndex = insertRectangle(x, y, width, height, index);
      if (overlappingIndex > -1) {
        return helper.message({ custom: `Widget ${index} is overlapping with widget ${overlappingIndex}` });
      }
    }

    return layout;
  })
  .default(null)
  .allow(null);

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

type AnalyticsPanelLayout = CardPosition[] | null;

interface AnalyticsPanel {
  hashId: string;
  title: string;
  layouts: AnalyticsPanelLayout;
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
  columnsCount,
};
