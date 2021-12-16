import Joi from 'joi';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const schema = (apiVersion: number): Joi.ObjectSchema => {
  const model = Joi.object().keys({
    hashId: Joi.string().required().example('po177'),
    generatedAt: Joi.date().required().example('2019-12-31T15:23Z'),
    channelIndex: Joi.number().integer().allow(null).required()
      .description('The channel of the installed device. When null, the measurement is not taken by a device but manually entered')
      .example(0),
    channelMeasurementIndex: Joi.number().integer().allow(null).default(null)
      .example(0)
      .description('Not null for device measurements. Represents the device channel this measurement is taken from, see the channels key in the device type object.'),
    reportHashId: Joi.string().required().example('qoa978'),
    pinHashId: Joi.string().allow(null).required().example('e13d57'),
    orderOfMagnitude: Joi.number().integer().min(-128).max(127)
      .required()
      .example(-3)
      .description('The measured value is significand * 10 ^ orderOfMagnitude. It has as many significant figures as the significand has (except when the significand is 0, then the number of significant figures is not defined)'),
    significand: Joi.number().integer().min(-2147483648).max(2147483647)
      .required()
      .example(-1500)
      .description('The measured value is significand * 10 ^ orderOfMagnitude. It has as many significant figures as the significand has (except when the significand is 0, then the number of significant figures is not defined)'),
    performance: Joi.number().integer().default(0)
      .description('-1: not compared to thresholds, 0: within thresholds, 1: outside serious thresholds but inside critical thresholds, 2: outside critical thresholds'),
    anomalousDetector: Joi.boolean().allow(null).default(null)
      .description('Anomaly detector classification, false: not an anomaly, true: is an anomaly, null: unknown'),
    anomalousUser: Joi.boolean().allow(null).default(null)
      .description('User classification, false: not an anomaly, true: is an anomaly, null: unknown'),
  })
    .tag('measurement')
    .description('A value representing a measurement of a certain quantity at a certain pin by a device or human at a specific point in time.');

  return model;
};

interface Measurement {
  hashId: string;
  generatedAt: Date;
  channelIndex: number | null;
  channelMeasurementIndex: number | null;
  reportHashId: string;
  pinHashId: string | null;
  orderOfMagnitude: number;
  significand: number;
  performance: number;
  anomalousDetector: boolean | null;
  anomalousUser: boolean | null;
}

export { schema, Measurement };
