import Joi from '@hapi/joi';
import { schema as siNumberSchema, SiNumber } from './si-number';

const schema = Joi.object().keys({
  name: Joi.object().pattern(
    /.*/,
    Joi.string(),
  ).required().example({ en: 'Cathodic protection sensor', nl: 'Kathodische beschermingssensor' }),
  defaultMeasurementInterval: Joi.number().integer().default(21600).description('in seconds'), // every 6 hours
  minimumMeasurementInterval: Joi.number().integer().default(300).description('in seconds'),
  batteryPowered: Joi.boolean().required().example(false),
  channels: Joi.array().items(Joi.object().keys({
    name: Joi.object().pattern(
      /.*/,
      Joi.string(),
    ).required(),
    defaultPinName: Joi.object().pattern(
      /.*/,
      Joi.string(),
    ).when('linkable', { is: true, then: Joi.required() }),
    defaultThresholds: Joi.object().pattern(
      /.*/,
      Joi.object().keys({
        criticallyLow: siNumberSchema.allow(null).default(null),
        low: siNumberSchema.allow(null).default(null),
        high: siNumberSchema.allow(null).default(null),
        criticallyHigh: siNumberSchema.allow(null).default(null),
      }),
    ).default({}),
    linkable: Joi.boolean().default(true).description('If false, it cannot be linked to a pin'),
    typeKey: Joi.string().allow(null).default(null),
    properties: Joi.array().items(Joi.string()).default([]).description('Configurable by user'),
  })).required().example([
    {
      name: { en: 'Red', nl: 'Rood' },
      defaultThresholds: {
        voltageDC: {
          criticallyLow: { significand: -1700, orderOfMagnitude: -3 },
          low: { significand: -1500, orderOfMagnitude: -3 },
          high: { significand: -1400, orderOfMagnitude: -3 },
          criticallyHigh: { significand: -1200, orderOfMagnitude: -3 },
        },
      },
      defaultPinName: { en: '1.1', nl: '1.1' },
      linkable: true,
      typeKey: null,
      properties: ['referenceVoltage'],
    },
    {
      name: { en: 'Yellow', nl: 'Geel' },
      defaultThresholds: {
        voltageDC: {
          criticallyLow: { significand: -1700, orderOfMagnitude: -3 },
          low: { significand: -1500, orderOfMagnitude: -3 },
          high: { significand: -1400, orderOfMagnitude: -3 },
          criticallyHigh: { significand: -1200, orderOfMagnitude: -3 },
        },
      },
      defaultPinName: { en: '1.2', nl: '1.2' },
      linkable: true,
      typeKey: null,
      properties: ['referenceVoltage'],
    },
    {
      name: { en: 'Blue', nl: 'Blauw' },
      defaultThresholds: {
        voltageDC: {
          criticallyLow: { significand: -1700, orderOfMagnitude: -3 },
          low: { significand: -1500, orderOfMagnitude: -3 },
          high: { significand: -1400, orderOfMagnitude: -3 },
          criticallyHigh: { significand: -1200, orderOfMagnitude: -3 },
        },
      },
      defaultPinName: { en: '1.3', nl: '1.3' },
      linkable: true,
      typeKey: null,
      properties: ['referenceVoltage'],
    },
    {
      name: { en: 'Sensor', nl: 'Sensor' },
      typeKey: 'sensor',
      defaultThresholds: {
        voltageDC: {
          criticallyLow: { significand: -1700, orderOfMagnitude: -3 },
          low: { significand: -1500, orderOfMagnitude: -3 },
          high: { significand: -1400, orderOfMagnitude: -3 },
          criticallyHigh: { significand: -1200, orderOfMagnitude: -3 },
        },
      },
      defaultPinName: { en: 'Sensor', nl: 'Sensor' },
      linkable: true,
      properties: [],
    },
  ]),
  properties: Joi.array().items(Joi.string()).default([]).description('Configurable by device supplier'),
})
  .tag('deviceType')
  .description('Information about the type of device');


interface DeviceType {
  name: {
    [lang: string]: string;
  };
  defaultMeasurementInterval: number;
  minimumMeasurementInterval: number;
  batteryPowered: boolean;
  channels: {
    name: {
      [lang: string]: string;
    };
    defaultPinName?: {
      [lang: string]: string;
    };
    defaultThresholds: {
      [quantityKey: string]: {
        criticallyLow: SiNumber | null;
        low: SiNumber | null;
        high: SiNumber | null;
        criticallyHigh: SiNumber | null;
      };
    };
    linkable: boolean;
    typeKey: string | null;
    properties: string[];
  }[];
  properties: string[];
}

export { schema, DeviceType };
