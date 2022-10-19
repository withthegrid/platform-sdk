import Joi from 'joi';
import { ConnectivityThreshold, schema as connectivityThresholdSchema } from '../../models/connectivity-threshold';
import { ControllerGeneratorOptionsWithClient } from '../../comms/controller';

type Request = {
  query: Pick<ConnectivityThreshold, 'priorityLevel' | 'deviceTypeHashId'>;
  body: {
    connectivityThreshold: {
      missedReports: ConnectivityThreshold['missedReports'];
      offlineForSeconds: ConnectivityThreshold['offlineForSeconds'];
    } | null;
  };
}
type EffectiveRequest = Request;

type Response = void;

const controllerGeneratorOptions: ControllerGeneratorOptionsWithClient = {
  method: 'post',
  path: '/',
  query: connectivityThresholdSchema.keys({
    missedReports: Joi.disallow(),
    offlineForSeconds: Joi.disallow(),
  }),
  body: Joi.object().keys({
    connectivityThreshold: connectivityThresholdSchema.keys({
      priorityLevel: Joi.disallow(),
      deviceTypeHashId: Joi.disallow(),
    }).allow(null),
  }).required(),
  right: { environment: 'ENVIRONMENT_ADMIN' },
  description: 'Creates or updates a connectivity threshold.',
};

export {
  controllerGeneratorOptions,
  Request,
  EffectiveRequest,
  Response,
};
