import Joi from '@hapi/joi';
import { ControllerGeneratorOptions } from '../../comms/controller';

import { schema as issueCommentSchema, IssueComment } from '../../models/issue-comment';


interface Request {
  params: {
    hashId: string;
  };
  body: {
    comment: string;
  };
}

type Response = {
  comment: IssueComment;
  userName: string | null;
  mentionedUsers: { hashId: string; name: string }[];
}[];

const controllerGeneratorOptions: ControllerGeneratorOptions = {
  method: 'post',
  path: '/:hashId',
  params: Joi.object().keys({
    hashId: Joi.string().required().example('a9hhi0'),
  }).required(),
  body: Joi.object().keys({
    comment: Joi.string().max(65536).allow('').required()
      .example('This looks serious.'),
  }).required(),
  right: 'ISSUES',
  response: Joi.array().items(Joi.object().keys({
    comment: issueCommentSchema.required(),
    userName: Joi.string().allow(null).required().example('John Doe'),
    mentionedUsers: Joi.array().items(Joi.object().keys({
      hashId: Joi.string().required().example('ba5qq1'),
      name: Joi.string().required().example('Jane Doe'),
    })).required(),
  })).required(),
  description: 'Update a comment on an issue (if it is yours)',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
