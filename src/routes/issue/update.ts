import Joi from 'joi';
import { ControllerGeneratorOptionsWithClient } from '../../comms/controller';

import { schema as issueCommentSchema, IssueComment } from '../../models/issue-comment';

interface Request {
  params: {
    hashId: string;
  };
  body: {
    title?: string;
    links?: {
      pinGroupHashId: string;
      pinHashId: string | null;
    }[];
    assignedUserHashId?: string | null;
    quantityHashIds?: string[];
    labelHashIds?: string[];
    level?: 0 | 1 | 2;
    typeKey?: 'missing' | 'incorrect' | 'unexpected' | 'unrelated';
    startAt?: Date;
    endAt?: Date | null;
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
    })),
    title: Joi.string().max(100).example('Temperature is too high'),
    pinGroupHashId: Joi.string(),
    assignedUserHashId: Joi.string().allow(null),
    pinHashId: Joi.string().allow(null),
    quantityHashIds: Joi.array().items(Joi.string()).max(10),
    labelHashIds: Joi.array().items(Joi.string()).max(10),
    level: Joi.number().valid(0, 1, 2),
    typeKey: Joi.string().valid('missing', 'incorrect', 'unexpected', 'unrelated'),
    startAt: Joi.date(),
    endAt: Joi.date().allow(null),
  }).and('pinGroupHashId', 'pinHashId').required(),
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
