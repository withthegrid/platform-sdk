import Joi from 'joi';
import { ControllerGeneratorOptionsWithClient } from '../../comms/controller';

interface Request {
  body: {
    links?: { // TODO withthegrid/platform#1586 Rob: deprecated
      pinGroupHashId: string;
      pinHashId: string | null;
    }[];
    assignedUserHashId?: string | null;
    pinGroupHashId?: string; // TODO withthegrid/platform#1586 Rob: required in future
    pinHashIds?: string[]; // TODO withthegrid/platform#1586 Rob: required in future
    automation?: { // TODO withthegrid/platform#1586 Rob: required in future
      type: 'missing'
    } | {
      type: 'thresholds'
      quantityHashIds: string[];
    } | null;
    title: string;
    level: 0 | 1 | 2;
    typeKey?: 'missing' | 'incorrect' | 'unexpected' | 'unrelated'; // TODO withthegrid/platform#1586 Rob: deprecated
    comment: string;
    quantityHashIds?: string[]; // TODO withthegrid/platform#1586 Rob: deprecated
    labelHashIds?: string[];
    startAt?: Date; // TODO withthegrid/platform#1586 Rob: deprecated
    endAt?: Date | null; // TODO withthegrid/platform#1586 Rob: deprecated
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
    links: Joi.array().min(1).max(20).items(Joi.object().keys({
      pinGroupHashId: Joi.string().required().example('dao97'),
      pinHashId: Joi.string().allow(null).required().example(null),
    })), // TODO withthegrid/platform#1586 Rob: deprecated
    assignedUserHashId: Joi.string().allow(null).default(null),
    pinGroupHashId: Joi.string().example(['dao97']), // TODO withthegrid/platform#1586 Rob: required in future
    pinHashIds: Joi.array().items(Joi.string()).example(['e13d57']).description('When empty, all pins are affected'), // TODO withthegrid/platform#1586 Rob: required in future
    automation: Joi.alternatives().try( // TODO withthegrid/platform#1586 Rob: required in future
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
    ).allow(null).example(null),
    title: Joi.string().max(100).required().example('Temperature is too high'),
    level: Joi.number().valid(0, 1, 2).required().example(0),
    typeKey: Joi.string().valid('missing', 'incorrect', 'unexpected', 'unrelated'), // TODO withthegrid/platform#1586 Rob: deprecated
    comment: Joi.string().max(65536).allow('').required()
      .example('This looks serious.'),
    // TODO withthegrid/platform#1586 Rob: deprecated
    quantityHashIds: Joi.array().items(Joi.string()).max(10),
    labelHashIds: Joi.array().items(Joi.string()).max(10).default([])
      .example(['u98a24']),
    startAt: Joi.date(), // TODO withthegrid/platform#1586 Rob: deprecated
    endAt: Joi.date().allow(null), // TODO withthegrid/platform#1586 Rob: deprecated

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
