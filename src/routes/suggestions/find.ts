import Joi from 'joi';
import {
  ControllerGeneratorOptionsWithClient,
  ControllerGeneratorOptionsWithoutClientOrSupplier, ControllerGeneratorOptionsWithSupplier,
} from '../../comms/controller';

const suggestionTypes = [
  'clientReportType.name',
  'commandType.name',
  'deviceType.name',
  'edge.name',
  'grid.name',
  'issue.title',
  'pinGroup.name',
  'pin.name',
  'quantity.name',
  'quantity.unit',
  'user.name',
  'environment.name',
] as const;

type SuggestionType = (typeof suggestionTypes)[number];

interface Request {
  query: {
    search: string;
    type: SuggestionType;
    rowsPerPage: number;
    offset?: string;
  };
}

type EffectiveRequest = Request;

interface ResponseRow {
  hashId: string,
    name: string,
}

interface Response {
  results: ResponseRow[];
}

const controllerGeneratorOptions: ControllerGeneratorOptionsWithSupplier = {
  method: 'get',
  path: '/',
  query: Joi.object().keys({
    search: Joi.string().allow('').required().example('v1.1.0'),
    type: Joi.string().valid(...suggestionTypes).required().example('issue.title'),
    offset: Joi.string().example('Installed v1.1.0-rc3')
      .description('To retrieve the next page, provide last item of the array'),
    rowsPerPage: Joi.number()
      .integer()
      .min(1)
      .max(500)
      .default(50),
  }).default(),
  right: { environment: 'READ', supplier: 'ENVIRONMENT_ADMIN' },
  response: Joi.object().keys({
    results: Joi.array().items(
      Joi.object().keys({
        hashId: Joi.string().required(),
        name: Joi.string().required(),
      }),
    ).required()
      .example([
        { hashId: 'bdh12', name: 'Installed v1.1.0-rc4' },
        { hashId: 'dhs34', name: 'Installed v1.1.0-rc5' },
        { hashId: 'hdj23', name: 'Installed v1.1.0-rc6' },
      ]),
  }).required(),
  description: 'Get suggestions for field of type, filtered by search',
};

export {
  controllerGeneratorOptions,
  suggestionTypes,
  Request,
  EffectiveRequest,
  Response,
  ResponseRow,
  SuggestionType,
};
