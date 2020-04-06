import Joi from '@hapi/joi';

const schema = Joi.object().keys({
  hashId: Joi.string().required().example('a9hhi0'),
  userHashId: Joi.string().allow(null).required().example('b45zo0')
    .description('If null, the comment is created by an automated process'),
  comment: Joi.string().allow('').required().example('This looks serious.'),
  createdAt: Joi.date().required().example('2019-12-31T15:23Z'),
  updatedAt: Joi.date().required().example('2019-12-31T15:23Z'),
  deletedAt: Joi.date().allow(null),
})
  .description('A comment on a specific issue')
  .tag('issueComment');

interface IssueComment {
  hashId: string;
  userHashId: string | null;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export { schema, IssueComment };
