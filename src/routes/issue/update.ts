import Joi from 'joi';
import { ControllerGeneratorOptionsWithClient } from '../../comms/controller';

import { schema as issueCommentSchema, IssueComment } from '../../models/issue-comment';

interface Request {
  params: {
    hashId: string;
  };
  body: {
    title?: string;
    links?: { // TODO withthegrid/platform#1586 Rob: deprecated
      pinGroupHashId: string;
      pinHashId: string | null;
    }[];
    pinGroupHashId?: string;
    pinHashIds: string[];
    automation?: {
      type: 'missing'
    } | {
      type: 'thresholds'
      quantityHashIds: string[];
    } | null;
    assignedUserHashId?: string | null;
    quantityHashIds?: string[]; // TODO withthegrid/platform#1586 Rob: deprecated
    labelHashIds?: string[];
    closed?: boolean;
    level?: 0 | 1 | 2;
    typeKey?: 'missing' | 'incorrect' | 'unexpected' | 'unrelated'; // TODO withthegrid/platform#1586 Rob: deprecated
    startAt?: Date; // TODO withthegrid/platform#1586 Rob: deprecated
    endAt?: Date | null; // TODO withthegrid/platform#1586 Rob: deprecated
  };
}

type Response = {
  newComment: IssueComment;
  newCommentUserName: string | null;
  newCommentMentionedUsers: { hashId: string; name: string }[];
} | void;

const controllerGeneratorOptions: ControllerGeneratorOptionsWithClient = {
  method: 'post',
  path: '/:hashId',
  params: Joi.object().keys({
    hashId: Joi.string().required().example('c19aid'),
  }).required(),
  body: Joi.object().keys({
    links: Joi.array().min(1).max(20).items(Joi.object().keys({
      pinGroupHashId: Joi.string().required().example('dao97'),
      pinHashId: Joi.string().allow(null).required().example(null),
    })), // TODO withthegrid/platform#1586 Rob: deprecated
    title: Joi.string().max(100).example('Temperature is too high'),
    pinGroupHashId: Joi.string(),
    pinHashIds: Joi.array().items(Joi.string()).description('When empty, all pins are affected'),
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
    ).allow(null),
    assignedUserHashId: Joi.string().allow(null),
    pinHashId: Joi.string().allow(null), // TODO withthegrid/platform#1586 Rob: deprecated
    // TODO withthegrid/platform#1586 Rob: deprecated
    quantityHashIds: Joi.array().items(Joi.string()).max(10),
    labelHashIds: Joi.array().items(Joi.string()).max(10),
    closed: Joi.boolean(),
    level: Joi.number().valid(0, 1, 2),
    typeKey: Joi.string().valid('missing', 'incorrect', 'unexpected', 'unrelated'), // TODO withthegrid/platform#1586 Rob: deprecated
    startAt: Joi.date(), // TODO withthegrid/platform#1586 Rob: deprecated
    endAt: Joi.date().allow(null), // TODO withthegrid/platform#1586 Rob: deprecated
  }).required(),
  right: { environment: 'ISSUES' },
  response: Joi.object().keys({
    newComment: issueCommentSchema,
    newCommentUserName: Joi.string().max(255).allow(null).required()
      .example('John Doe'),
    newCommentMentionedUsers: Joi.array().items(Joi.object().keys({
      hashId: Joi.string().required().example('ba5qq1'),
      name: Joi.string().max(255).required().example('Jane Doe'),
    })).required(),
  }).description('An update might cause a new comment to be created. Current functionality only triggers a possible additional comment from the system'),
  description: 'Change the settings of a specific issue',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
