import Joi from 'joi';

import { schema as issueCommentSchema, IssueComment } from '../../models/issue-comment';
import { ControllerGeneratorOptions } from '../../comms/controller';

interface Request {
  params: {
    hashId: string;
  };
  body: {
    comment: string;
    closeIssue?: boolean;
  };
}

type EffectiveRequest = {
  params: Required<Request['params']>;
  body: Required<Request['body']>;
}

type Response = {
  newComments: {
    comment: IssueComment;
    userName: string | null;
  }[];
  mentionedUsers: { hashId: string; name: string }[];
};

const controllerGeneratorOptions: ControllerGeneratorOptions = {
  method: 'post',
  path: '/:hashId/comment',
  params: Joi.object().keys({
    hashId: Joi.string().required().example('a9hhi0').description('Identifies the issue to comment on'),
  }).required(),
  body: Joi.object().keys({
    comment: Joi.string().max(65536).allow('').required()
      .example('This looks serious.'),
    closeIssue: Joi.boolean().default(false),
  }).required(),
  right: { environment: 'ISSUES' },
  response: Joi.object().keys({
    newComments: Joi.array().items(Joi.object().keys({
      comment: issueCommentSchema.required(),
      userName: Joi.string().allow(null).required().example('John Doe'),
    })).required().description('A list of comments created by this call. Includes the comment that was posted and might include an additional comment created by the system'),
    mentionedUsers: Joi.array().items(Joi.object().keys({
      hashId: Joi.string().required().example('ba5qq1'),
      name: Joi.string().required().example('Jane Doe'),
    })).required().description('Mentioned users in returned comments'),
  }),
  description: 'Add a comment to a specific issue',
};

export {
  controllerGeneratorOptions,
  Request,
  EffectiveRequest,
  Response,
};
