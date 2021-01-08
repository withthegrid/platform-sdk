import Joi from 'joi';
import { ControllerGeneratorOptions } from '../../comms/controller';

interface Request {
  params: {
    hashId: string;
  };
  body: {
    name?: string;
    unit?: string;
    defaultOrderOfMagnitude?: number;
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
      .default(0)
      .example(3)
      .description('Defines default order of magnitude to be selected at manual report form'),
  }).required(),
  right: { environment: 'ENVIRONMENT_ADMIN', supplier: 'ENVIRONMENT_ADMIN' },
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
