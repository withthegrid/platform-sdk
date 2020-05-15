import Joi from '@hapi/joi';
import { ControllerGeneratorOptions } from '../../comms/controller';

import { schema as commandSchema, Command } from '../../models/command';
import { schema as pinGroupSchema, PinGroup } from '../../models/pin-group';
import { schema as fileFromServerSchema, FileFromServer } from '../../models/file-from-server';


interface Request {
  params: {
    hashId: string;
  };
}

interface Response {
  command: Command;
  pinGroup: PinGroup | null;
  files: FileFromServer[];
}


const controllerGeneratorOptions: ControllerGeneratorOptions = {
  method: 'get',
  path: '/:hashId',
  params: Joi.object().keys({
    hashId: Joi.string().required().example('ga9741s'),
  }).required(),
  right: { environment: 'READ', supplier: 'ENVIRONMENT_ADMIN' },
  response: Joi.object().keys({
    command: commandSchema.required(),
    pinGroup: pinGroupSchema.allow(null).required(),
    files: Joi.array().items(fileFromServerSchema).required(),
  }).required(),
  description: 'Get a specific command identified by its hashId',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
