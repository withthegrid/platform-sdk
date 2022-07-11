import Joi from 'joi';
import { ControllerGeneratorOptionsWithClient } from '../../comms/controller';
import { AllContent, AnalyticsQueryContent, ChartContent } from '../../models/export-request';
import { schema as analyticsQuerySchema } from '../../models/analytics-query';

interface MeasurementFilterContentByHashId {
  type: 'measurementFilter';
  measurementFilterHashId: string;
}

// AllContent is still a reference to settings/add-export.ts
interface Request {
  body: {
    content: AllContent | MeasurementFilterContentByHashId | AnalyticsQueryContent | ChartContent;
    delimiter: ',' | ';';
    rowDelimiter: '\n' | '\r\n';
  };
}

interface Response {
  hashId: string;
}

const controllerGeneratorOptions: ControllerGeneratorOptionsWithClient = {
  method: 'post',
  path: '/export',
  body: Joi.object().keys({
    content: Joi.alternatives().try(
      Joi.object().keys({
        type: Joi.string().required().valid('measurementFilter').example('measurementFilter'),
        measurementFilterHashId: Joi.string().example('k8gh3').required(),
      }).required(),
      Joi.object().keys({
        type: Joi.string().required().valid('all').example('all'),
        staticOnly: Joi.boolean().required().example(false),
        gridHashId: Joi.string().allow(null).required().example(null),
        from: Joi.date().iso().required().example('2019-12-01T00:00Z'),
        to: Joi.date().iso().required().example('2020-01-01T00:00Z'),
      }).required(),
      Joi.object().keys({
        type: Joi.string().required().valid('analyticsQuery').example('analyticsQuery'),
        query: analyticsQuerySchema.required(),
        dashboardId: Joi.string().required().example('xd2rd4'),
        widgetName: Joi.string().required().example('Widget name'),
      }).required(),
      Joi.object().keys({
        type: Joi.string().required().valid('chart').example('chart'),
        startAt: Joi.date().required().example('2019-12-31T15:23Z'),
        endAt: Joi.date().required().example('2021-01-01T00:00Z').description('Up to not including'),
        series: Joi.array().max(40).items(Joi.object().keys({
          pinHashId: Joi.string().required().example('e13d57'),
          quantityHashId: Joi.string().required().example('sajia1'),
        })).required(),
        highResolution: Joi.boolean().default(false),
      }),
    ).required(),
    delimiter: Joi.string().valid(',', ';').required().example(','),
    rowDelimiter: Joi.string().valid('\n', '\r\n').required().example('\n'),
  }).required(),
  right: { environment: 'EXPORT' },
  response: Joi.object().keys({
    hashId: Joi.string().required().example('maay1'),
  }).required(),
  description: 'Request the creation of a zip file containing a data export',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
