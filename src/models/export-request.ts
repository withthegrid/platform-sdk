import Joi from '@hapi/joi';

const schema = Joi.object().keys({
  hashId: Joi.string().required().example('maay1'),
  from: Joi.date().iso().required().example('2019-12-01T00:00Z'),
  to: Joi.date().iso().required().example('2020-01-01T00:00Z'),
  staticOnly: Joi.boolean().required().example(true),
  gridHashId: Joi.string().allow(null).required().example(null),
  delimiter: Joi.string().valid(',', ';').required().example(','),
  rowDelimiter: Joi.string().valid('\n', '\r\n').required().example('\n'),
  status: Joi.string().valid('waiting', 'creating', 'available', 'deleted').required().example('available'),
  createdAt: Joi.date().required().example('2019-12-31T15:23Z'),
})
  .tag('exportRequest')
  .description('A request to create a zip file with a data export. Should not be used by machine accounts.');

interface ExportRequest {
  hashId: string;
  from: Date;
  to: Date;
  staticOnly: boolean;
  gridHashId: string | null;
  delimiter: ',' | ';';
  rowDelimiter: '\n' | '\r\n';
  status: 'waiting' | 'creating' | 'available' | 'deleted';
  createdAt: Date;
}

export { schema, ExportRequest };
