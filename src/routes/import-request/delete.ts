import Joi from 'joi';
import { ControllerGeneratorOptionsWithClient } from '../../comms/controller';

type Request = {
  params: {
    hashId: string;
  };
}

type Response = void;

const controllerGeneratorOptions: ControllerGeneratorOptionsWithClient = {
  method: 'delete',
  path: '/:hashId',
  params: Joi.object().keys({
    hashId: Joi
      .string()
      .required()
      .example('5x2znek')
      .description('The hashId of the import to be deleted'),
  }).required(),
  right: { environment: 'IMPORT' },
  description: 'Deletes an import',
};

export {
  controllerGeneratorOptions,
  Request,
  Response,
  Request as EffectiveRequest,
};
