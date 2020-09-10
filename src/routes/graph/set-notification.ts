import Joi from 'joi';
import { ControllerGeneratorOptions } from '../../comms/controller';

interface Request {
  params: {
    hashId: string;
  };
  body: {
    level: 0 | 1 | 2 | null;
  };
}

type Response = void;

const controllerGeneratorOptions: ControllerGeneratorOptions = {
  method: 'post',
  path: '/grid/:hashId/notification',
  params: Joi.object().keys({
    hashId: Joi.string().required().example('naud51'),
  }).required(),
  body: Joi.object().keys({
    level: Joi.number().valid(0, 1, 2).allow(null).required()
      .example(0)
      .description('Subscribe to every issue created on a pin group in this grid (0), when the issue gets serious (1) or when the issue gets critical (2). If you do not want to receive any notifications, set to null'),
  }).required(),
  right: { environment: 'READ' },
  description: 'Subscribe to or unsubscribe from new issues created on pin groups in this specific grid',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
