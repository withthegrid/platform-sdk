import Joi from 'joi';
import { EffectiveTableQuery, TableQuery, tableQuerySchemaGenerator } from '../../comms/table-controller';
import { ControllerGeneratorOptionsWithClient } from '../../comms/controller';
import { ConnectivityThreshold, schema as connectivityThresholdSchema } from '../../models/connectivity-threshold';
import { DeviceType, schema as deviceTypeSchema } from '../../models/device-type';

type ConnectivityThresholdQueryFields = {
  priorityLevel?: ConnectivityThreshold['priorityLevel'];
  deviceTypeHashId?: ConnectivityThreshold['deviceTypeHashId'];
};

type Query = TableQuery & ConnectivityThresholdQueryFields;

type Request = {
  query?: Query
} | undefined;

type EffectiveQuery = EffectiveTableQuery & ConnectivityThresholdQueryFields;

type EffectiveRequest = { query: EffectiveQuery };

type ResponseRow = {
  connectivityThreshold: ConnectivityThreshold;
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
        connectivityThreshold: connectivityThresholdSchema,
        deviceType: deviceTypeSchema(apiVersion).optional(),
      }),
    ),
  }),
  description: 'Returns all found connectivity thresholds for an environment.',
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
