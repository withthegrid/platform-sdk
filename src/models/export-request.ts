import Joi from 'joi';

interface AllContent {
  type: 'all';
  staticOnly: boolean;
  gridHashId: string | null;
  from: Date;
  to: Date;
}

interface MeasurementFilterContent {
  type: 'measurementFilter';
  name: string;
  description: string;
  from?: Date;
  to?: Date;
  // deprecated from here
  includePinsWithoutReports: boolean;
  reportTypeHashIds: string[];
  gridHashId: string | null;
  pinGroupHashIds: string[];
  quantityHashIds: string[];
  fieldKeys: string[];
}

type Content = AllContent | MeasurementFilterContent;

const contentSchema = Joi.alternatives().try(
  Joi.object().keys({
    type: Joi.string().required().valid('all').example('all'),
    staticOnly: Joi.boolean().required().example(false),
    gridHashId: Joi.string().allow(null).required().example(null),
    from: Joi.date().iso().required().example('2019-12-01T00:00Z'),
    to: Joi.date().iso().required().example('2020-01-01T00:00Z'),
  }).required(),
  Joi.object().keys({
    type: Joi.string().required().valid('measurementFilter').example('measurementFilter'),
    includePinsWithoutReports: Joi.boolean().required().example(true),
    reportTypeHashIds: Joi.array().min(1).max(20).items(Joi.string().example('l19a7s'))
      .default([]),
    gridHashId: Joi.string().allow(null).required(),
    pinGroupHashIds: Joi.array().min(0).max(50).items(Joi.string().example('dao97'))
      .required(),
    quantityHashIds: Joi.array().max(20).items(Joi.string().example('sajia1'))
      .default([]),
    fieldKeys: Joi.array().max(20).items(Joi.string().example('id')).default([]),
    from: Joi.date().iso().example('2019-12-01T00:00Z'),
    to: Joi.date().iso().example('2020-01-01T00:00Z'),
  }).required(),
);

const schema = Joi.object().keys({
  hashId: Joi.string().required().example('maay1'),
  content: contentSchema.required(),
  delimiter: Joi.string().valid(',', ';').required().example(','),
  rowDelimiter: Joi.string().valid('\n', '\r\n').required().example('\n'),
  status: Joi.string().valid('waiting', 'creating', 'available', 'deleted').required().example('available'),
  createdAt: Joi.date().required().example('2019-12-31T15:23Z'),
})
  .tag('exportRequest')
  .description('A request to create a zip file with a data export. Should not be used by machine accounts.');

interface ExportRequest {
  hashId: string;
  content: Content;
  delimiter: ',' | ';';
  rowDelimiter: '\n' | '\r\n';
  status: 'waiting' | 'creating' | 'available' | 'deleted';
  createdAt: Date;
}

export {
  schema,
  ExportRequest,
  AllContent,
  MeasurementFilterContent,
  Content,
  contentSchema,
};
