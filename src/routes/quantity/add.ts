import Joi from 'joi';
import { ControllerGeneratorOptions } from '../../comms/controller';
import { schema as siNumberSchema, SiNumber } from '../../models/si-number';

interface Request {
  body: {
    name: string;
    color?: string;
    unit: string;
    defaultOrderOfMagnitude: number;
    defaultCriticallyLowThreshold: SiNumber | null;
    defaultLowThreshold: SiNumber | null;
    defaultHighThreshold: SiNumber | null;
    defaultCriticallyHighThreshold: SiNumber | null;
    disableSiPrefixes: boolean;
  };
}

interface Response {
  hashId: string;
}

const controllerGeneratorOptions: ControllerGeneratorOptions = {
  method: 'post',
  path: '/',
  body: Joi.object().keys({
    name: Joi.string().required().example('Temperature'),
    color: Joi.string().default('#ff00ff').example('#ff00ff'),
    unit: Joi.string().required().example('K').description('Will be displayed with an SI-prefix (eg. k or M) if relevant'),
    defaultOrderOfMagnitude: Joi.number().integer().min(-128).max(127)
      .default(0)
      .example(3)
      .description('Defines default order of magnitude to be selected at manual report form'),
    defaultCriticallyLowThreshold: siNumberSchema.allow(null).default(null),
    defaultLowThreshold: siNumberSchema.allow(null).default(null),
    defaultHighThreshold: siNumberSchema.allow(null).default(null),
    defaultCriticallyHighThreshold: siNumberSchema.allow(null).default(null),
    disableSiPrefixes: Joi.boolean().default(false).example(true).description('Will disable SI-prefixes for this quantity if true'),
  }).required(),
  right: { environment: 'ENVIRONMENT_ADMIN', supplier: 'ENVIRONMENT_ADMIN' },
  response: Joi.object().keys({
    hashId: Joi.string().required().example('sajia1'),
  }).required(),
  description: 'Add a quantity',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
