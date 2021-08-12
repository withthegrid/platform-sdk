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
      notificationLevel: Joi.number().valid(0, 1, 2).allow(null).required()
        .example(0)
        .description('The user is subscribed to every issue created on locations in this environment (0), when the issue gets serious (1) or when the issue gets critical (2). If null, the user is not autmatically subscribed to new issues.'),
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
