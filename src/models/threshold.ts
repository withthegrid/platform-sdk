import Joi from 'joi';
import { schema as siNumberSchema, SiNumber } from './si-number';

interface Threshold {
    criticallyLow: SiNumber | null;
    low: SiNumber | null;
    high: SiNumber | null;
    criticallyHigh: SiNumber | null;
  }

const schema = Joi.object().keys({
  criticallyLow: siNumberSchema.allow(null).required(),
  low: siNumberSchema.allow(null).required(),
  high: siNumberSchema.allow(null).required(),
  criticallyHigh: siNumberSchema.allow(null).required(),
})
  .description('A limit on measurements of a certain quantity.')
  .tag('threshold')
  .meta({ className: 'threshold' });

export { schema, Threshold };
