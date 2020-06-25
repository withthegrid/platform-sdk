import Joi from '@hapi/joi';

type Json = string | number | boolean | null | Json[] | { [key: string]: Json };
type Body = { type: 'json'; data: Json } | { type: 'string'; data: string } | { type: 'hex'; data: string };

const schema = Joi.object().keys({
  hashId: Joi.string().required().example('1a532q'),
  incoming: Joi.boolean().required().example(true),
  createdAt: Joi.date().required().example('2019-12-31T15:23Z'),
  request: Joi.object().keys({
    url: Joi.object().keys({
      protocol: Joi.string().allow('').required().example('https'),
      host: Joi.string().allow('').required().example('api.withthegrid.com'),
      path: Joi.string().allow('').required().example('/something'),
      query: Joi.object().pattern(Joi.string(), Joi.alternatives().try(
        Joi.string().allow('').required(),
        Joi.array().items(Joi.string().allow('').required()).required(),
      ).required()).required().example({
        e: 'f1a4w1',
        t: 'asd193gaf11234',
      }),
    }).required(),
    ip: Joi.string().allow('').required().example('8.8.8.8'),
    method: Joi.string().allow('').required().example('post')
      .description('In lowercase'),
    headers: Joi.object().pattern(Joi.string(), Joi.alternatives().try(
      Joi.string().allow(''),
      Joi.array().items(Joi.string().allow('').required()).required(),
    ).required()).required().example({
      'content-type': 'application/json;charset=UTF-8',
    }),
    body: Joi.alternatives().try(
      Joi.object().keys({
        type: Joi.string().valid('json').required(),
        data: Joi.any().required(),
      }).required(),
      Joi.object().keys({
        type: Joi.string().valid('string', 'hex').required(),
        data: Joi.string().allow('').required(),
      }).required(),
    ).example({ type: 'json', data: { key: 'value' } }),
    certificate: Joi.object().keys({
      subjects: Joi.array().items(Joi.array().items(Joi.object().keys({
        key: Joi.object().keys({
          encoding: Joi.string().valid('utf8', 'hex').required().example('utf8'),
          value: Joi.string().allow('').required().example('cn'),
        }).required(),
        value: Joi.object().keys({
          encoding: Joi.string().valid('utf8', 'hex').required().example('utf8'),
          value: Joi.string().allow('').required().example('common name'),
        }).required(),
      }))).required(),
      serial: Joi.number().required().example(10),
    }).allow(null).required(),
  }).required(),
  response: Joi.object().keys({
    statusCode: Joi.number().required().example(200),
    headers: Joi.object().pattern(Joi.string(), Joi.string()).required().example({
      'content-type': 'application/json;charset=UTF-8',
    }),
    body: Joi.alternatives().try(
      Joi.object().keys({
        type: Joi.string().valid('json').required(),
        data: Joi.any().required(),
      }).required(),
      Joi.object().keys({
        type: Joi.string().valid('string', 'hex').required(),
        data: Joi.string().allow('').required(),
      }).required(),
    ).example({ type: 'json', data: { key: 'value' } }),
  }).required(),
})
  .description('An object defining an incoming or outgoing request')
  .tag('webRequest');


interface WebRequest {
  hashId: string;
  incoming: boolean;
  createdAt: Date;
  request: {
    url: {
      protocol: string;
      host: string;
      path: string;
      query: Record<string, string | string[]>;
    };
    ip: string;
    method: string;
    headers: Record<string, string | string[] | undefined>;
    body?: Body;
    certificate: {
      subjects: {
        key: {
          encoding: 'utf8' | 'hex';
          value: string;
        };
        value: {
          encoding: 'utf8' | 'hex';
          value: string;
        };
      }[][];
      serial: number;
    } | null;
  };
  response: {
    statusCode: number;
    headers: Record<string, string>;
    body?: Body;
  };
}

export { schema, WebRequest };
