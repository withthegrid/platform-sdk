import Joi from 'joi';
import { ControllerGeneratorOptions } from '../../comms/controller';
import { RecursiveRequired } from '../../helpers';

interface Request {
  query: {
    search: string;
  };
}

type EffectiveRequest = RecursiveRequired<Request>;

interface ResponseRow {
  objectType: 'grid' | 'edge' | 'pinGroup';
  hashId: string;
  name: string;
}

type Response = ResponseRow[];

const controllerGeneratorOptions: ControllerGeneratorOptions = {
  method: 'get',
  path: '/',
  query: Joi.object().keys({
    search: Joi.string().required().allow('').example('a')
      .description('Only objects whose name start with the provided string are returned. For devices, it is matched against its hashId'),
    objects: Joi.array().items(Joi.object().keys({
      type: Joi.string().valid('device', 'pinGroup', 'edge', 'grid').required().example('device'),
      filter: Joi.array().items(Joi.string()).default([]).description('only for devices, filters the result on device type'),
      linkedOnly: Joi.boolean().default(false).description('only for device and pinGroup types'),
      unlinkedOnly: Joi.boolean().default(false).description('only for device and pinGroup types'),
    })),
  }).required(),
  right: { environment: 'READ' },
  description: 'Get up to 10 objects of your choice matching the provided string',
  response: Joi.array().items(Joi.object().keys({
    objectType: Joi.string().valid('grid', 'pinGroup', 'edge').required().example('pinGroup'),
    hashId: Joi.string().required().example('dao97'),
    name: Joi.string().required().example('My location'),
  })).required(),
};

export {
  controllerGeneratorOptions,
  Request,
  EffectiveRequest,
  Response,
};
