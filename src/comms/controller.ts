import Joi from 'joi';
import { CancelTokenSource } from 'axios';
import Comms from '.';

import ParsingError from '../errors/parsing';
import CommsError from '../errors/comms';
import AuthenticationError from '../errors/authentication';

interface VersionedAnySchemaFunction {
  (apiVersion: number): Joi.AnySchema;
}

interface ControllerGeneratorOptions {
  description?: string;
  method: 'get' | 'post' | 'put' | 'delete' | 'all';
  path: string;
  params?: Joi.ObjectSchema;
  query?: Joi.AnySchema; // to allow for Joi.alternatives()
  body?: Joi.AnySchema | VersionedAnySchemaFunction;
  response?: Joi.AnySchema | VersionedAnySchemaFunction;
  right: { supplier?: string; environment?: string };
}

type RequestParams = Record<string, string | number>;

type RequestQuery = Record<string, any>;

interface Request {
  params?: RequestParams;
  query?: RequestQuery;
  body?: any;
  options?: {
    /**
     * If provided AND false, response will not be validated against Joi schema.
     * This will save quite some time, but will cause Date objects to still be strings
     * Note: defaults are already filled server side, so that's not an issue
     */
    validateResponse: boolean
  };
}

interface Result<EffectiveRequestImplementation, ResponseImplementation> {
  request: EffectiveRequestImplementation;
  response: Promise<ResponseImplementation>;
  cancelToken: CancelTokenSource;
}

export default <RequestImplementation extends Request | undefined, EffectiveRequestImplementation extends Request, ResponseImplementation>( // eslint-disable-line max-len
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
  let validatedParams: Record<string, string | number | boolean | null> | undefined;
  if (options.params !== undefined) {
    const validation = options.params.validate(parameters?.params, { abortEarly: false });
    if (validation.error !== undefined) {
      throw new ParsingError(validation.error, 'params');
    }
    validatedParams = validation.value;
    if (validatedParams !== undefined) {
      Object.entries(validatedParams).forEach(([key, value]) => {
        validatedSubPath = validatedSubPath.replace(`:${key}`, `${value}`);
      });
    }
  }

  let validatedQuery: any;
  if (options.query !== undefined) {
    const validation = options.query.validate(parameters?.query, { abortEarly: false });
    if (validation.error !== undefined) {
      throw new ParsingError(validation.error, 'query');
    }
    validatedQuery = validation.value;
  }

  let validatedBody: any;
  let bodySchema: Joi.AnySchema | undefined;
  if (typeof options.body === 'function') {
    bodySchema = options.body(comms.apiVersion);
  } else if (options.body !== undefined) {
    bodySchema = options.body;
  }

  if (bodySchema !== undefined) {
    const validation = bodySchema.validate(parameters?.body, { abortEarly: false });
    if (validation.error !== undefined) {
      throw new ParsingError(validation.error, 'body');
    }
    validatedBody = validation.value;
  }

  const path = `/${routerPath}${validatedSubPath}`;

  const cancelToken = Comms.getCancelToken();

  const responsePromise = new Promise((resolve, reject) => {
    comms.request(
      options.method === 'all' ? 'post' : options.method,
      path,
      validatedQuery,
      validatedBody,
      cancelToken,
    )
      .then((response) => {
        // Axios response will be an empty string if there is no response
        if (response !== '' && options.response !== undefined) {
          if (parameters?.options?.validateResponse === false) {
            resolve(response);
            return;
          }
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
