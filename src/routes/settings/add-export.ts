import Joi from '@hapi/joi';
import { ControllerGeneratorOptions } from '../../comms/controller';


interface Request {
  body: {
    from: Date;
    to: Date;
    staticOnly: boolean;
    gridHashId: string | null;
    delimiter: ',' | ';';
    rowDelimiter: '\n' | '\r\n';
  };
}

interface Response {
  hashId: string;
}


const controllerGeneratorOptions: ControllerGeneratorOptions = {
  method: 'post',
  path: '/export',
  body: Joi.object().keys({
    from: Joi.date().iso().required().example('2019-12-01T00:00Z'),
    to: Joi.date().iso().required().example('2020-01-01T00:00Z'),
    staticOnly: Joi.boolean().required().example(false),
    gridHashId: Joi.string().allow(null).required().example(null),
    delimiter: Joi.string().valid(',', ';').required().example(','),
    rowDelimiter: Joi.string().valid('\n', '\r\n').required().example('\n'),
  }).required(),
  right: { environment: 'EXPORT' },
  response: Joi.object().keys({
    hashId: Joi.string().required().example('maay1'),
  }).required(),
  description: 'Request the creation of a zip file containing a data export',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
};
