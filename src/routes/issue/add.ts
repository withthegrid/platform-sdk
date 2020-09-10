import Joi from 'joi';
import { ControllerGeneratorOptions } from '../../comms/controller';

interface Request {
  body: {
    links: {
      pinGroupHashId: string;
      pinHashId: string | null;
    }[];
    assignedUserHashId?: string | null;
    title: string;
    level: 0 | 1 | 2;
    typeKey: 'missing' | 'incorrect' | 'unexpected' | 'unrelated';
    comment: string;
    quantityHashIds: string[];
    labelHashIds?: string[];
    startAt: Date;
    endAt?: Date | null;
  };
}

type EffectiveRequest = {
  body: Required<Request['body']>;
}

interface Response {
  hashId: string;
  mentionedUsers: { hashId: string; name: string }[];
}

const controllerGeneratorOptions: ControllerGeneratorOptions = {
  method: 'post',
  path: '/',
  body: Joi.object().keys({
    links: Joi.array().min(1).max(20).items(Joi.object().keys({
      pinGroupHashId: Joi.string().required().example('dao97'),
      pinHashId: Joi.string().allow(null).required().example(null),
    }))
      .required(),
    assignedUserHashId: Joi.string().allow(null).default(null),
    title: Joi.string().max(100).required().example('Temperature is too high'),
    level: Joi.number().valid(0, 1, 2).required().example(0),
    typeKey: Joi.string().valid('missing', 'incorrect', 'unexpected', 'unrelated').required().example('missing'),
    comment: Joi.string().max(65536).allow('').required()
      .example('This looks serious.'),
    quantityHashIds: Joi.array().items(Joi.string()).max(10).required()
      .example(['sajia1']),
    labelHashIds: Joi.array().items(Joi.string()).max(10).default([])
      .example(['u98a24']),
    startAt: Joi.date().required().example('2019-12-31T15:23Z'),
    endAt: Joi.date().allow(null).default(null),
  }).required(),
  right: { environment: 'ISSUES' },
  response: Joi.object().keys({
    hashId: Joi.string().required().example('c19aid'),
    mentionedUsers: Joi.array().items(Joi.object().keys({
      hashId: Joi.string().required().example('ba5qq1'),
      name: Joi.string().required().example('Jane Doe'),
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
