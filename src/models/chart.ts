import Joi from 'joi';

import { schema as quantitySchema, Quantity } from './quantity';
import { schema as pinSchema, Pin } from './pin';
import { schema as pinGroupSchema, PinGroup } from './pin-group';
import { schema as thresholdSchema, Threshold } from './threshold';

const schema = (apiVersion: number): Joi.ObjectSchema => Joi.object().keys({
  title: Joi.string().allow(null).example(null).required(),
  series: Joi.array().items(Joi.object().keys({
    quantity: quantitySchema(apiVersion).required(),
    pin: pinSchema.required(),
    pinGroup: pinGroupSchema.required(),
    color: Joi.string().example('#ff0000').description('A hex color string').allow(null)
      .default(null),
    pinThreshold: thresholdSchema.allow(null).required(),
  })).required(),
})
  .tag('chart')
  .meta({ className: 'chart' })
  .description('The meta-data describing a chart');

interface Chart {
  title: string | null;
  series: {
    quantity: Quantity;
    pin: Pin;
    pinGroup: PinGroup;
    color: string | null;
    pinThreshold: Threshold | null;
  }[];
}

export { schema, Chart };
