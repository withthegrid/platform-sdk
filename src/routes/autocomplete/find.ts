import Joi from '@hapi/joi';
import { ControllerGeneratorOptions } from '../../comms/controller';
import { RecursiveRequired } from '../../helpers';

interface Request {
  query: {
    search: string;
    objects: {
      type: string;
      filter?: string[];
      linkedOnly?: boolean;
      unlinkedOnly?: boolean;
    }[];
  };
}


type EffectiveRequest = RecursiveRequired<Request>;

type ResponseRow =
  {
    objectType: 'device' | 'grid';
    hashId: string;
    name: string;
    typeKey: string;
  }
  | {
    objectType: 'edge';
    hashId: string;
    name: string;
  }
  | {
    objectType: 'pinGroup';
    hashId: string;
    name: string;
    deviceTypeKey: string | null;
  };

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
  right: 'READ',
  description: 'Get up to 10 objects of your choice matching the provided string',
  response: Joi.array().items(Joi.alternatives().try(
    Joi.object().keys({
      objectType: Joi.string().valid('device').required().example('device'),
      hashId: Joi.string().required().example('j1iha9'),
      name: Joi.string().required().example('j1iha9'),
      typeKey: Joi.string().required().example('cp-pole'),
    }),
    Joi.object().keys({
      objectType: Joi.string().valid('pinGroup').required().example('pinGroup'),
      hashId: Joi.string().required().example('dao97'),
      name: Joi.string().required().example('My measurement location'),
      deviceTypeKey: Joi.string().allow(null).required().example('j1iha9'),
    }),
    Joi.object().keys({
      objectType: Joi.string().valid('edge').required().example('edge'),
      hashId: Joi.string().required().example('ka08d'),
      name: Joi.string().required().example('Test segment'),
    }),
    Joi.object().keys({
      objectType: Joi.string().valid('grid').required().example('grid'),
      hashId: Joi.string().required().example('naud51'),
      name: Joi.string().required().example('My grid'),
      typeKey: Joi.string().required().example('pinGroup'),
    }),
  )).required(),
};

export {
  controllerGeneratorOptions,
  Request,
  EffectiveRequest,
  Response,
};
