import Joi from 'joi';

const fieldSchema = Joi.alternatives().try(
  Joi.string().required().example('pinGroup.hashId'),
  Joi.object().keys({ expression: Joi.string().required() }),
);

const constraintSchema = Joi.object().keys({
  left: Joi.alternatives().try(fieldSchema, Joi.number()).required(),
  comparison: Joi.string().required(),
  right: Joi.object().keys({
    field: Joi.alternatives().try(Joi.string(), Joi.number()),
    value: Joi.alternatives().try(Joi.string().allow(''), Joi.number(), Joi.boolean()),
  }),
});

const limitSchema = Joi.object().keys({
  limitedTo: Joi.number().required(),
  per: Joi.array().items(Joi.object().keys({
    columnIndex: Joi.number().required(),
  })).default(() => []).example([]),
  sortedBy: Joi.array().items(Joi.object().keys({
    columnIndex: Joi.number().required(),
    descending: Joi.boolean().required(),
  })).default(() => []).example([]),
});

const conditionSchema = Joi.object().keys({
  type: Joi.string().valid('or', 'and').required(),
  restrictions: Joi.array().items(Joi.alternatives().try(
    Joi.link('#analyticsQueryCondition').description('Another condition (recursion allowed)').required().meta({
      swagger: {
        type: 'object',
        properties: {
          type: {
            type: 'string',
            enum: ['or', 'and'],
            example: 'or',
          },
          restrictions: {
            type: 'object',
            example: '{}',
            description: 'recursive list of more conditions',
          },
        },
        required: ['type'],
        additionalProperties: false,
      },
      swaggerOverride: true,
    }),
    constraintSchema.required(),
  )).required(),
}).id('analyticsQueryCondition');

const schema = Joi.object().keys({
  source: Joi.string().example('pinGroup').required(),
  columns: Joi.array().items(Joi.alternatives().try(
    Joi.object().keys({ field: fieldSchema, name: Joi.string(), dataTypeHint: Joi.string().valid('string', 'integer', 'number', 'boolean') }).required(),
    Joi.object().keys({ type: Joi.string().valid('count', 'share').required(), condition: conditionSchema, name: Joi.string() }).required(),
    Joi.object().keys({
      type: Joi.string().valid('sum', 'mean', 'min', 'max', 'any').required(),
      condition: conditionSchema,
      field: fieldSchema,
      name: Joi.string(),
      dataTypeHint: Joi.string().valid('string', 'integer', 'number', 'boolean'),
    }).required(),
    Joi.object().keys({
      type: Joi.string().valid('timeGroup').required(),
      field: Joi.string().required(),
      granularity: Joi.string().required(),
      name: Joi.string(),
    }).required(),
  )).required(),
  filter: conditionSchema,
  limitBy: limitSchema,
  offset: Joi.string(),
  sort: Joi.array().items(Joi.object().keys({
    columnIndex: Joi.number().required(),
    descending: Joi.boolean().required(),
  })).default(() => []).example([]),
  rowsPerPage: Joi.number().default(20).min(10).max(100),
})
  .description('An object describing an analytics query.')
  .meta({ className: 'analyticsQuery' })
  .tag('analyticsQuery');

type TimeGranularity =
  | 'hour'
  | 'day'
  | 'week'
  | 'month'
  | 'year'
  | 'hourOfTheDay'
  | 'dayOfTheWeek'
  | 'monthOfTheYear';

type Comparison = '=' | '>=' | '<=' | '>' | '<' | 'like' | '<>' | 'isNull' | 'isNotNull' | 'isNamedRange' | 'notLike';

type Value = string | number | boolean;

type Field = string | { expression: string };

interface Constraint {
  // string: column name, number (or stringified number): number i is reference to query.columns[i]
  left: Field | number;
  comparison: Comparison;
  right?: { field: string | number } | { value: Value };
}

interface Condition {
  type: 'or' | 'and';
  restrictions: (Constraint | Condition)[];
}

interface Limit {
  limitedTo: number,
  per: { columnIndex: number }[];
  sortedBy: { columnIndex: number, descending: boolean }[];
}

type AggregatedColumn =
  {
    type: 'count' | 'share';
    condition?: Condition;
    name?: string;
  } | {
    type: 'sum' | 'mean' | 'min' | 'max' | 'any';
    condition?: Condition;
    field: Field;
    name?: string;
    dataTypeHint?: undefined | 'string' | 'integer' | 'boolean' | 'number';
  };

type TimeGroupColumn = { type: 'timeGroup', field: string; granularity: TimeGranularity, name?: string };

type UnaggregatedColumn = { type: undefined, field: Field, name?: string, dataTypeHint?: undefined | 'string' | 'integer' | 'boolean' | 'number' };

type Column = UnaggregatedColumn | AggregatedColumn | TimeGroupColumn

function isUnaggregatedColumn(column: Column): column is UnaggregatedColumn {
  return column.type === undefined;
}

function isTimeGroupColumn(column: Column): column is TimeGroupColumn {
  return column.type === 'timeGroup';
}

interface AnalyticsQuery {
  source: string;
  columns: (Column)[];
  filter?: Condition;
  limitBy?: Limit;
  offset?: string;
  sort: { columnIndex: number, descending: boolean }[];
  rowsPerPage?: number;
}

export {
  schema,
  AnalyticsQuery,
  Constraint,
  Condition,
  Limit,
  TimeGranularity,
  Field,
  AggregatedColumn,
  UnaggregatedColumn,
  isUnaggregatedColumn,
  TimeGroupColumn,
  isTimeGroupColumn,
};
