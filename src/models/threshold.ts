import Joi from 'joi';

import { schema as siNumberSchema, SiNumber } from './si-number';

const schema = Joi.object().keys({
  hashId: Joi.string().required().example('tap192'),
  pinHashId: Joi.string().required().example('e13d57'),
  criticallyLow: siNumberSchema.allow(null).required(),
  low: siNumberSchema.allow(null).required(),
  high: siNumberSchema.allow(null).required(),
  criticallyHigh: siNumberSchema.allow(null).required(),
})
  .description('A limit on measurements of a certain quantity. If a measurement outside these limits is registered, an issue is automatically created (if there isn\'t a relevant one open yet)')
  .tag('threshold');

interface Threshold {
  hashId: string;
  pinHashId: string;
  criticallyLow: SiNumber | null;
  low: SiNumber | null;
  high: SiNumber | null;
  criticallyHigh: SiNumber | null;
}

export { schema, Threshold };
