import Joi from '@hapi/joi';
import { CancelTokenSource } from 'axios';
import Comms from '.';

import ParsingError from '../errors/parsing';
import CommsError from '../errors/comms';
import AuthenticationError from '../errors/authentication';

interface ResponseSchemaFunction {
  (apiVersion: number): Joi.AnySchema;
}

interface ControllerGeneratorOptions {
  description?: string;
  method: 'get' | 'post' | 'put' | 'delete';
  path: string;
  params?: Joi.ObjectSchema;
  query?: Joi.ObjectSchema;
  body?: Joi.AnySchema;
  response?: Joi.AnySchema | ResponseSchemaFunction;
  right: string | null;
}

type RequestParams = Record<string, string | number>;

type RequestQuery = Record<string, any>;

interface Request {
  params?: RequestParams;
  query?: RequestQuery;
  body?: any;
}

interface Result<EffectiveRequestImplementation, ResponseImplementation> {
  request: EffectiveRequestImplementation;
  response: Promise<ResponseImplementation>;
  cancelToken: CancelTokenSource;
}

export default <RequestImplementation extends Request, EffectiveRequestImplementation extends Request, ResponseImplementation>( // eslint-disable-line max-len
  options: ControllerGeneratorOptions,
  routerPath: string,
  auth: boolean,
  comms: Comms,
) => (parameters: RequestImplementation): Result<EffectiveRequestImplementation, ResponseImplementation> => { // eslint-disable-line max-len
  if (auth && !comms.loggedIn) {
    throw new AuthenticationError('unauthorized', 'Login required');
  }

  // validate parameters
  let validatedSubPath = options.path;
  let validatedParams: object | undefined;
  if (options.params !== undefined) {
    const validation = options.params.validate(parameters.params, { abortEarly: false });
    if (validation.error !== undefined) {
      throw new ParsingError(validation.error, 'params');
    }
    validatedParams = validation.value;
    if (validatedParams !== undefined) {
      Object.entries(validatedParams).forEach(([key, value]) => {
        validatedSubPath = validatedSubPath.replace(`:${key}`, value);
      });
    }
  }

  let validatedQuery: object | undefined;
  if (options.query !== undefined) {
    const validation = options.query.validate(parameters.query, { abortEarly: false });
    if (validation.error !== undefined) {
      throw new ParsingError(validation.error, 'query');
    }
    validatedQuery = validation.value;
  }

  let validatedBody: any;
  if (options.body !== undefined) {
    const validation = options.body.validate(parameters.body, { abortEarly: false });
    if (validation.error !== undefined) {
      throw new ParsingError(validation.error, 'body');
    }
    validatedBody = validation.value;
  }

  const path = `/${routerPath}${validatedSubPath}`;

  const cancelToken = Comms.getCancelToken();

  const responsePromise = new Promise((resolve, reject) => {
    comms.request(
      options.method,
      path,
      validatedQuery,
      validatedBody,
      cancelToken,
    )
      .then((response) => {
        if (options.response !== undefined) {
          let responseSchema: Joi.AnySchema;
          if (typeof options.response === 'function') {
            responseSchema = options.response(comms.apiVersion);
          } else {
            responseSchema = options.response;
          }

          if (responseSchema !== undefined) {
            const validationResult = responseSchema.validate(
              response,
              { allowUnknown: true },
            );
            if (validationResult.error !== undefined) {
              reject(new CommsError(`Response does not adhere to schema: ${validationResult.error.message}`));
              return;
            }
            resolve(validationResult.value);
            return;
          }
        }
        resolve(undefined);
      })
      .catch((e) => reject(e));
  });

  return {
    request: {
      query: validatedQuery,
      body: validatedBody,
      params: validatedParams,
    } as EffectiveRequestImplementation,
    response: responsePromise as Promise<ResponseImplementation>,
    cancelToken,
  };
};

export {
  RequestQuery,
  RequestParams,
  Request,
  Result,
  ControllerGeneratorOptions,
};
