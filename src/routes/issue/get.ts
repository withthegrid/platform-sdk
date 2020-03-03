import Joi from '@hapi/joi';
import { ControllerGeneratorOptions } from '../../comms/controller';

import { schema as issueSchema, Issue } from '../../models/issue';
import { schema as issueCommentSchema, IssueComment } from '../../models/issue-comment';
import { schema as quantitySchema, Quantity } from '../../models/quantity';
import { schema as labelSchema, Label } from '../../models/label';
import { schema as pinGroupSchema, PinGroup } from '../../models/pin-group';
import { schema as pinSchema, Pin } from '../../models/pin';

interface Request {
  params: {
    hashId: string;
  };
}

interface Response {
  issue: Issue;
  userName: string | null;
  assignedUserName: string | null;
  quantities: Quantity[];
  mentionedUsers: { hashId: string; name: string }[];
  labels: Label[];
  comments: {
    comment: IssueComment;
    userName: string | null;
  }[];
  subscribed: boolean;
  links: {
    pinGroup: PinGroup;
    pin: Pin | null;
  }[];
}


const controllerGeneratorOptions: ControllerGeneratorOptions = {
  method: 'get',
  path: '/:hashId',
  params: Joi.object().keys({
    hashId: Joi.string().required().example('c19aid'),
  }).required(),
  right: 'READ',
  response: Joi.object().keys({
    issue: issueSchema.required(),
    userName: Joi.string().allow(null).required().example('John Doe'),
    assignedUserName: Joi.string().allow(null).required().example(null),
    quantities: Joi.array().items(quantitySchema).required(),
    mentionedUsers: Joi.array().items(Joi.object().keys({
      hashId: Joi.string().required().example('ba5qq1'),
      name: Joi.string().required().example('Jane Doe'),
    })).required(),
    labels: Joi.array().items(labelSchema).required(),
    comments: Joi.array().items(Joi.object().keys({
      comment: issueCommentSchema.required(),
      userName: Joi.string().allow(null).required().example('John Doe'),
    })).required(),
    subscribed: Joi.boolean().required().example(false),
    links: Joi.array().items(Joi.object().keys({
      pinGroup: pinGroupSchema.required(),
      pin: pinSchema.allow(null).required(),
    })).required(),
  }),
  description: 'Get a specific issue identified by its hashId',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
