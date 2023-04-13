import Joi from 'joi';
import { ControllerGeneratorOptionsWithClient } from '../../comms/controller';

import { schema as issueCommentSchema, IssueComment } from '../../models/issue-comment';

interface Request {
  params: {
    hashId: string;
  };
  body: {
    title?: string;
    pinGroupHashId?: string;
    pinHashIds?: string[];
    automation?: {
      type: 'missing'
    } | {
      type: 'thresholds'
      quantityHashIds: string[];
    } | null;
    assignedUserHashId?: string | null;
    labelHashIds?: string[];
    closed?: boolean;
    level?: 0 | 1 | 2;
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
    title: Joi.string().max(255).example('Temperature is too high'),
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
    labelHashIds: Joi.array().items(Joi.string()).max(10),
    closed: Joi.boolean(),
    level: Joi.number().valid(0, 1, 2),
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
