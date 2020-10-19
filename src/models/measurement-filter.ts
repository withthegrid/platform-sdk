import Joi from 'joi';

const schema = Joi.object().keys({
  hashId: Joi.string().required().example('k8gh3'),
  name: Joi.string().required().example('North'),
  description: Joi.string().required().allow('').example('Temperatures in the North'),
  period: Joi.alternatives().try(
    Joi.string().valid('lastMonth', 'lastQuarter', 'lastYear').required(),
    Joi.object().keys({
      since: Joi.date(),
      before: Joi.date().example('2019-12-31T15:23Z'),
    }).required(),
  ).required().example('lastMonth'),
  createdAt: Joi.date().required().example('2019-12-31T15:23Z'),
  updatedAt: Joi.date().required().example('2019-12-31T15:23Z'),
  deletedAt: Joi.date().allow(null),
})
  .description('An object that contains the configuration to search through measurements.')
  .tag('measurementFilter');

interface MeasurementFilter {
  hashId: string;
  name: string;
  description: string;
  period: 'lastMonth' | 'lastQuarter' | 'lastYear' | {
    since?: Date; // including
    before?: Date; // not including
  };
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export { schema, MeasurementFilter };
