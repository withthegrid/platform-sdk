import Joi from 'joi';
import { ControllerGeneratorOptionsWithClient } from '../../comms/controller';

interface Request {
  body: {
    assignedUserHashId?: string | null;
    pinGroupHashId: string;
    pinHashIds: string[];
    automation: {
      type: 'missing'
    } | {
      type: 'thresholds'
      quantityHashIds: string[];
    } | null;
    title: string;
    level: 0 | 1 | 2;
    comment: string;
    labelHashIds?: string[];
  };
}

type EffectiveRequest = {
  body: Request['body'] & Required<Pick<Request['body'], 'assignedUserHashId' | 'labelHashIds'>>;
}

interface Response {
  hashId: string;
  mentionedUsers: { hashId: string; name: string }[];
}

const controllerGeneratorOptions: ControllerGeneratorOptionsWithClient = {
  method: 'post',
  path: '/',
  body: Joi.object().keys({
    assignedUserHashId: Joi.string().allow(null).default(null),
    pinGroupHashId: Joi.string().required().example(['dao97']),
    pinHashIds: Joi.array().items(Joi.string()).required().example(['e13d57'])
      .description('When empty, all pins are affected'),
    automation: Joi.alternatives().try(
      Joi.object({
        type: Joi.string().valid('missing').required(),
      }),
      Joi.object({
        type: Joi.string().valid('thresholds').required(),
        quantityHashIds: Joi.array().items(Joi.string())
          .min(1)
          .max(10)
          .required()
          .example(['sajia1']),
      }),
    ).allow(null)
      .required()
      .example(null),
    title: Joi.string().max(255).required().example('Temperature is too high'),
    level: Joi.number().valid(0, 1, 2).required().example(0),
    comment: Joi.string().max(65536).allow('').required()
      .example('This looks serious.'),
    labelHashIds: Joi.array().items(Joi.string()).max(10).default([])
      .example(['u98a24']),
  }).required(),
  right: { environment: 'ISSUES' },
  response: Joi.object().keys({
    hashId: Joi.string().required().example('c19aid'),
    mentionedUsers: Joi.array().items(Joi.object().keys({
      hashId: Joi.string().required().example('ba5qq1'),
      name: Joi.string().max(255).required().example('Jane Doe'),
    })).required(),
  }).required(),
  description: 'Create an issue',
};

export {
  controllerGeneratorOptions,
  Request,
  EffectiveRequest,
  Response,
};
