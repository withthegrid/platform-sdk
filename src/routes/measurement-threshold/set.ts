import Joi from 'joi';
import { ControllerGeneratorOptionsWithClient } from '../../comms/controller';

import { schema as siNumberSchema, SiNumber } from '../../models/si-number';

interface Body {
  pinHashId: string;
  quantityHashId: string;
  thresholds: {
    criticallyLow: SiNumber | null;
    low: SiNumber | null;
    high: SiNumber | null;
    criticallyHigh: SiNumber | null;
  } | null;
}

interface Request {
  body: Body | Body[];
}

interface Response {
  hashId: (string | null) | (string | null)[];
}

const bodySchema = Joi.object().keys({
  pinHashId: Joi.string().required().example('e13d57'),
  quantityHashId: Joi.string().required().example('sajia1'),
  thresholds: Joi.object().keys({
    criticallyLow: siNumberSchema.allow(null).required().description('If null, incoming measurements are not checked against this value'),
    low: siNumberSchema.allow(null).required().description('If null, incoming measurements are not checked against this value'),
    high: siNumberSchema.allow(null).required().description('If null, incoming measurements are not checked against this value'),
    criticallyHigh: siNumberSchema.allow(null).required().description('If null, incoming measurements are not checked against this value'),
  }).allow(null).required(),
}).required();

const controllerGeneratorOptions: ControllerGeneratorOptionsWithClient = {
  method: 'post',
  path: '/thresholds',
  body: Joi.alternatives().try(
    bodySchema,
    Joi.array().items(bodySchema).required(),
  ).required(),
  right: { environment: 'THRESHOLDS' },
  response: Joi.object().keys({
    hashId: Joi.alternatives().try(
      Joi.string().allow(null).required().example('tap192')
        .description('If thresholds is set to null, this property will be null'),
      Joi.array().items(
        Joi.string().allow(null).required().example('tap192')
          .description('If thresholds in body array item is set to null, the corresponding hashId item will be null'),
      ).required(),
    ).required(),
  }).required(),
  description: 'Sets issue triggers (thresholds) on a specific quantitity on a specific port (pin). If a measurement outside these limits is registered, an issue is automatically created (if there isn\'t a relevant one open yet)',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
