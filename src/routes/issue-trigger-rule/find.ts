// TODO withthegrid/platform-client/issues/1370 Gabriel: deprecated

import Joi from 'joi';
import { EffectiveTableQuery, TableQuery, tableQuerySchemaGenerator } from '../../comms/table-controller';
import { ControllerGeneratorOptionsWithClient } from '../../comms/controller';
import { IssueTriggerRule, schema as issueTriggerRuleSchema } from '../../models/issue-trigger-rule';
import { DeviceType, schema as deviceTypeSchema } from '../../models/device-type';

type IssueTriggerRuleQueryFields = {
  priorityLevel?: IssueTriggerRule['priorityLevel'];
  deviceTypeHashId?: IssueTriggerRule['deviceTypeHashId'];
};

type Query = TableQuery & IssueTriggerRuleQueryFields;

type Request = {
  query?: Query
} | undefined;

type EffectiveQuery = EffectiveTableQuery & IssueTriggerRuleQueryFields;

type EffectiveRequest = { query: EffectiveQuery };

type ResponseRow = {
  issueTriggerRule: IssueTriggerRule;
  deviceType?: DeviceType;
};

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
  response: (apiVersion: number) => Joi.object().keys({
    nextPageOffset: Joi.string().allow(null).example(null).required()
      .description('This is the last page if nextPageOffset is null'),
    rows: Joi.array().items(
      Joi.object().keys({
        issueTriggerRule: issueTriggerRuleSchema,
        deviceType: deviceTypeSchema(apiVersion).optional(),
      }),
    ),
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
