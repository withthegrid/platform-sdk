import Joi from 'joi';
import { ControllerGeneratorOptions } from '../../comms/controller';

import { schema as environmentSchema, Environment } from '../../models/environment';
import { schema as userSchema, User } from '../../models/user';

interface Request {
  body: {
    assertion: string;
  };
}

interface Response {
  jwt: string;
  user: User;
  environment?: Environment;
  environmentRights?: string[];
}

type ResponsesIncludingDeprecated = Response | {
  jwt: string;
  user: User;
  clients: Environment[];
}

const controllerGeneratorOptions: ControllerGeneratorOptions = {
  method: 'post',
  path: '/machine-login',
  right: {},
  description: 'Acquire a JSON web token that can be used to perform authenticated requests. The jwt expiration is typically 30 days.',
  body: Joi.object().keys({
    assertion: Joi.string().required().example('12as:7d6a4123').description('Is provided when you create a machine account (also called an API account)'),
  }).required(),
  response: (apiVersion: number): Joi.AnySchema => {
    const body = Joi.object().keys({
      jwt: Joi.string().required().example('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpcCI6InJvYkB3aXRodGhlZ3JpZC5jb20iLCJpA9qiOjE1Nzc3MTA5NjksImV4cCI6MTU4MDMwMjk2OSwiaXNzIjoid2l0aHRoZWdyaWQifQ.7PbwwsWU7x63Pd-J_KZQL22r185GfiufixyXQGOyQs8'),
      user: userSchema.required(),
    }).required();

    if (apiVersion <= 1) {
      const oldBody = body.keys({
        clients: Joi.array().items(environmentSchema).required(),
      });
      return oldBody;
    }

    const newBody = body.keys({
      environment: environmentSchema.description('A random monitoring environment this user has access to'),
      environmentRights: Joi.array().items(Joi.string()).example(['STATIC', 'USERS'])
        .description('See the getting started section about rights'),
    });
    return newBody;
  },
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
  ResponsesIncludingDeprecated,
};
