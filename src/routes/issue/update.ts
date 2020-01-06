import Joi from '@hapi/joi';
import { ControllerGeneratorOptions } from '../../comms/controller';

import { schema as issueCommentSchema, IssueComment } from '../../models/issue-comment';


interface Request {
  params: {
    hashId: string;
  };
  body: {
    title?: string;
    pinGroupHashId?: string;
    pinHashId?: string | null;
    quantityHashIds?: string[];
    level?: 0 | 1 | 2;
    typeKey?: 'missing' | 'incorrect' | 'unexpected' | 'unrelated';
    startAt?: Date;
    endAt?: Date | null;
  };
}

type Response = {
  newComment: IssueComment;
  newCommentUserName: string | null;
} | void;

const controllerGeneratorOptions: ControllerGeneratorOptions = {
  method: 'post',
  path: '/:hashId',
  params: Joi.object().keys({
    hashId: Joi.string().required().example('c19aid'),
  }).required(),
  body: Joi.object().keys({
    title: Joi.string().max(100).example('Temperature is too high'),
    pinGroupHashId: Joi.string(),
    pinHashId: Joi.string().allow(null),
    quantityHashIds: Joi.array().items(Joi.string()).max(10),
    level: Joi.number().valid(0, 1, 2),
    typeKey: Joi.string().valid('missing', 'incorrect', 'unexpected', 'unrelated'),
    startAt: Joi.date(),
    endAt: Joi.date().allow(null),
  }).and('pinGroupHashId', 'pinHashId').required(),
  right: 'ISSUES',
  response: Joi.object().keys({
    newComment: issueCommentSchema,
    newCommentUserName: Joi.string().allow(null).required().example('John Doe'),
  }),
  description: 'Change the settings of a specific issue',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
