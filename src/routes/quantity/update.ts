import Joi from 'joi';
import { ControllerGeneratorOptions } from '../../comms/controller';
import { schema as siNumberSchema, SiNumber } from '../../models/si-number';

interface Request {
  params: {
    hashId: string;
  };
  body: {
    name?: string;
    unit?: string;
    defaultOrderOfMagnitude?: number;
    defaultCriticallyLowThreshold?: SiNumber | null;
    defaultLowThreshold?: SiNumber | null;
    defaultHighThreshold?: SiNumber | null;
    defaultCriticallyHighThreshold?: SiNumber | null;
  };
}

type Response = void;

const controllerGeneratorOptions: ControllerGeneratorOptions = {
  method: 'post',
  path: '/:hashId',
  params: Joi.object().keys({
    hashId: Joi.string().required().example('sajia1'),
  }).required(),
  body: Joi.object().keys({
    name: Joi.string().example('Temperature'),
    unit: Joi.string().example('K').description('Will be displayed with an SI-prefix (eg. k or M) if relevant'),
    defaultOrderOfMagnitude: Joi.number().integer().min(-128).max(127)
      .example(3)
      .description('Defines default order of magnitude to be selected at manual report form'),
    defaultCriticallyLowThreshold: siNumberSchema.allow(null),
    defaultLowThreshold: siNumberSchema.allow(null),
    defaultHighThreshold: siNumberSchema.allow(null),
    defaultCriticallyHighThreshold: siNumberSchema.allow(null),
  }).required(),
  right: { environment: 'ENVIRONMENT_ADMIN', supplier: 'ENVIRONMENT_ADMIN' },
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
