import Joi from 'joi';

const schema = Joi.object().keys({
  hashId: Joi.string().required().example('k8gh3'),
  name: Joi.string().required().example('North').max(100),
  description: Joi
    .string()
    .required()
    .allow('')
    .example('Temperatures in the North')
    .max(255),
  period: Joi.alternatives().try(
    Joi.string().valid('lastMonth', 'lastQuarter', 'lastYear').required().example('lastMonth'),
    Joi.object().keys({
      since: Joi.date(),
      before: Joi.date().example('2019-12-31T15:23Z'),
    }).required(),
  ).required(),
  includePinsWithoutReports: Joi.boolean().required().example(true),
  createdAt: Joi.date().required().example('2019-12-31T15:23Z'),
  updatedAt: Joi.date().required().example('2019-12-31T15:23Z'),
  deletedAt: Joi.date().allow(null),
})
  .description('An object that contains the configuration to search through measurements.')
  .tag('measurementFilter')
  .meta({ className: 'measurementFilter' });

interface MeasurementFilter {
  hashId: string;
  name: string;
  description: string;
  period: 'lastMonth' | 'lastQuarter' | 'lastYear' | {
    since?: Date; // including
    before?: Date; // not including
  };
  includePinsWithoutReports: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export { schema, MeasurementFilter };
