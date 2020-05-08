import Joi from '@hapi/joi';
import { ControllerGeneratorOptions } from '../../comms/controller';
import { parserExample } from '../../models/supplier-report-type';

interface Request {
  params: {
    hashId: string;
  };
  body: {
    parser: string;
    retryFailedSince?: Date;
  };
}


type Response = void;

const controllerGeneratorOptions: ControllerGeneratorOptions = {
  method: 'post',
  path: '/:hashId',
  params: Joi.object().keys({
    hashId: Joi.string().required().example('y124as'),
  }).required(),
  body: Joi.object().keys({
    parser: Joi.string().required().example(parserExample).description('A javascript function that parses an incoming report. See [add link]'),
    retryFailedSince: Joi.date().description('If supplied, all incoming reports of this type that failed to decode since the provided date will be reparsed.'),
  }).required(),
  right: { supplier: 'ENVIRONMENT_ADMIN' },
  description: 'Update a device report type.',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
