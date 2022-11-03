import Joi from 'joi';

import { schema as thresholdSchema, Threshold } from './threshold';

const schema = thresholdSchema.keys({
  hashId: Joi.string().required().example('tap192'),
  pinHashId: Joi.string().required().example('e13d57'),
})
  .description('Called an "Issue trigger" in the UI. A limit on measurements of a certain quantity. If a measurement outside these limits is registered, an issue is automatically created (if there isn\'t a relevant one open yet)')
  .tag('measurementThreshold')
  .meta({ className: 'measurementThreshold' });

interface MeasurementThreshold extends Threshold {
  hashId: string;
  pinHashId: string;
}

export { schema, Threshold, MeasurementThreshold };
