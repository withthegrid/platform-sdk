import Joi from 'joi';
import { EffectiveTableQuery, TableQuery, tableQuerySchemaGenerator } from '../../comms/table-controller';
import { ControllerGeneratorOptionsWithClient } from '../../comms/controller';
import { IssueTriggerRule, schema } from '../../models/issue-trigger-rule';

type IssueTriggerRuleQueryFields = Omit<
  Pick<IssueTriggerRule, 'priorityLevel' | 'deviceTypeHashId'>,
  'priorityLevel'>;

type Query = TableQuery & IssueTriggerRuleQueryFields;

type Request = {
  query?: Query
} | undefined;

type EffectiveQuery = EffectiveTableQuery & IssueTriggerRuleQueryFields;

type EffectiveRequest = { query: EffectiveQuery };

type ResponseRow = IssueTriggerRule;
type Response = {
  nextPageOffset: string | null;
  rows: Array<ResponseRow>;
}

const controllerGeneratorOptions: ControllerGeneratorOptionsWithClient = {
  method: 'get',
  path: '/find',
  query: tableQuerySchemaGenerator().keys({
    deviceTypeHashId: Joi.string().example('xd2rd4'),
    priorityLevel: Joi.number().integer().valid(1, 2),
  }),
  right: { environment: 'READ' },
  response: Joi.object().keys({
    nextPageOffset: Joi.string().allow(null).example(null).required()
      .description('This is the last page if nextPageOffset is null'),
    rows: Joi.array().items(schema),
  }),
  description: 'Returns all found issue trigger rules for an environment.',
};

export {
  controllerGeneratorOptions,
  Request,
  EffectiveRequest,
  Response,
  Query,
  EffectiveQuery,
  ResponseRow,
};
