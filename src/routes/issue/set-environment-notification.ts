import Joi from 'joi';
import { ControllerGeneratorOptionsWithClient } from '../../comms/controller';

interface Request {
  body: {
    notificationLevel: 0 | 1 | 2 | null;
  };
}

type Response = void;

const controllerGeneratorOptions: ControllerGeneratorOptionsWithClient = {
  method: 'post',
  path: '/environment-notification',
  body: Joi.object()
    .keys({
      notificationLevel: Joi.number().allow(null).required().example(true),
    })
    .required(),
  right: { environment: 'READ' },
  description: 'Subscribe to or unsubscribe to all issues in environment',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
