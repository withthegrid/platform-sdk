import Joi from 'joi';

const constraintSchema = Joi.object().keys({
  left: Joi.alternatives().try(Joi.string(), Joi.number()).required(),
  comparison: Joi.string().required(),
  right: Joi.object().keys({
    field: Joi.alternatives().try(Joi.string(), Joi.number()),
    value: Joi.alternatives().try(Joi.string().allow(''), Joi.number(), Joi.boolean()),
  }),
});

const conditionSchema = Joi.object().keys({
  type: Joi.string().valid('or', 'and').required(),
  restrictions: Joi.array().items(Joi.alternatives().try(
    Joi.link('#analyticsQueryCondition').description('Another condition (recursion allowed)').required(),
    constraintSchema.required(),
  )).required(),
}).id('analyticsQueryCondition');

const fieldSchema = Joi.alternatives().try(
  Joi.string().required().example('pinGroup.hashId'),
  Joi.object().keys({ expression: Joi.string().required(), name: Joi.string().required() }),
);

const schema = Joi.object().keys({
  source: Joi.string().example('pinGroup').required(),
  columns: Joi.array().items(Joi.alternatives().try(
    Joi.object().keys({ field: fieldSchema }).required(),
    Joi.object().keys({ type: Joi.string().valid('count', 'share').required(), condition: conditionSchema }).required(),
    Joi.object().keys({ type: Joi.string().valid('sum', 'mean', 'min', 'max').required(), condition: conditionSchema, field: fieldSchema }).required(),
    Joi.object().keys({ type: Joi.string().valid('timeGroup').required(), field: Joi.string().required(), granularity: Joi.string().required() }).required(),
  )).required(),
  filter: conditionSchema,
  offset: Joi.string(),
  sort: Joi.array().items(Joi.object().keys({
    columnIndex: Joi.number().required(),
    descending: Joi.boolean().required(),
  })).default(() => []).example([]),
  rowsPerPage: Joi.number().default(20).min(10).max(100),
})
  .description('An object describing an analytics query.')
  .tag('analyticsQuery');

type TimeGranularity =
  'day'
  | 'week'
  | 'month'
  | 'year'
  | 'dayOfTheWeek'
  | 'monthOfTheYear';

type Comparison = '=' | '>=' | '<=' | '>' | '<' | 'like' | '<>' | 'isNull' | 'isNotNull' | 'inGrid' | 'isNamedRange';

type Value = string | number | boolean;

type Field = string | { expression: string, name: string }

interface Constraint {
  // string: column name, number (or stringified number): number i is reference to query.columns[i]
  left: string | number;
  comparison: Comparison;
  right?: { field: string | number } | { value: Value };
}

interface Condition {
  type: 'or' | 'and';
  restrictions: (Constraint | Condition)[];
}

type AggregatedColumn =
  { type: 'count'; condition?: Condition } // COUNT(*) or SUM(CASE WHEN condition THEN 1 ELSE 0 END)
  | { type: 'share'; condition?: Condition } // SUM(CASE WHEN condition THEN 1 ELSE 0 END)/COUNT(*)
  | { type: 'sum'; condition?: Condition; field: Field } // SUM(CASE WHEN condition THEN field ELSE 0 END)
  | { type: 'mean'; condition?: Condition; field: Field } // SUM(CASE WHEN condition THEN field ELSE 0 END) / SUM(CASE WHEN condition/1 THEN 1 ELSE 0 END)
  | { type: 'min'; condition?: Condition; field: Field } // MIN(CASE WHEN condition THEN field ELSE NULL END)
  | { type: 'max'; condition?: Condition; field: Field } // MAX(CASE WHEN condition THEN field ELSE NULL END)
  ;

type TimeGroupColumn = { type: 'timeGroup', field: string; granularity: TimeGranularity };

type UnaggregatedColumn = { type: undefined, field: Field };

interface AnalyticsQuery {
  source: string;
  columns: (UnaggregatedColumn | AggregatedColumn | TimeGroupColumn)[];
  filter?: Condition;
  offset?: string;
  sort: { columnIndex: number, descending: boolean }[];
  rowsPerPage: number;
}

export {
  schema,
  AnalyticsQuery,
  Constraint,
  Condition,
  TimeGranularity,
  Field,
};
