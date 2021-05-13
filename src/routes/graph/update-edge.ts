import Joi from 'joi';
import { ControllerGeneratorOptionsWithClient } from '../../comms/controller';
import { schema as fieldsToServerUpdateSchema, FieldsToServerUpdate } from '../../models/fields/fields-to-server-update';

import { schema as edgeSchema, Edge } from '../../models/edge';

interface EffectiveLineStringBody {
  fields?: FieldsToServerUpdate;
  mapLayer?: string;
  nodeHashIds?: [string, string];
  geometry?: { type: 'LineString'; coordinates: [number, number][] };
  photo?: string | null;
}

interface EffectiveMultiLineStringBody {
  fields?: FieldsToServerUpdate;
  mapLayer?: string;
  geometry: { type: 'MultiLineString'; coordinates: [number, number][][] };
  photo?: string | null;
}

interface Request {
  params: {
    hashId: string;
  };
  body: EffectiveLineStringBody | EffectiveMultiLineStringBody;
}

interface Response {
  edge: Edge;
}

type ResponsesIncludingDeprecated = Response | {
  name: string;
}

const controllerGeneratorOptions: ControllerGeneratorOptionsWithClient = {
  method: 'post',
  path: '/edge/:hashId',
  params: Joi.object().keys({
    hashId: Joi.string().required().example('ka08d'),
  }).required(),
  body: Joi.alternatives().try(
    Joi.object().keys({
      fields: fieldsToServerUpdateSchema,
      mapLayer: Joi.string().invalid('nodes').example('myOtherLayer'),
      nodeHashIds: Joi.array().length(2).items(Joi.string().required())
        .example(['qp111a', 'qa222b'])
        .description('The first node is assumed to correspond with the first coordinate in the geometry of the edge, and the second one to the last. If not supplied, it is not updated, unless formerly the edge had a MultiLineString geometry, then 2 new nodes are created.'),
      geometry: Joi.object().keys({
        type: Joi.string().valid('LineString').required(),
        coordinates: Joi.array().min(2).max(5000)
          .items(Joi.array().length(2).items(Joi.number()).description('[lon, lat] in WGS84'))
          .required(),
      }),
      photo: Joi.string().allow(null).description('Should be a dataurl. Null clears the photo'),
    }).required(),
    Joi.object().keys({
      fields: fieldsToServerUpdateSchema,
      mapLayer: Joi.string().invalid('nodes'),
      geometry: Joi.object().keys({
        type: Joi.string().valid('MultiLineString').required(),
        coordinates: Joi.array().min(1).max(500)
          .items(Joi.array().min(2).max(5000)
            .items(Joi.array().length(2).items(Joi.number()).description('[lon, lat] in WGS84')))
          .required(),
      }),
      photo: Joi.string().allow(null).description('Should be a dataurl. Null clears the photo'),
    }).required(),
  ),
  response: (apiVersion: number): Joi.ObjectSchema => {
    if (apiVersion <= 2) {
      return Joi.object().keys({
        name: Joi.string().required().example('My line'),
      }).required();
    }
    return Joi.object().keys({
      edge: edgeSchema.required(),
    }).required();
  },
  right: { environment: 'STATIC' },
  description: 'Updates a specific edge',
};

export {
  controllerGeneratorOptions,
  Request,
  Request as EffectiveRequest,
  Response,
  ResponsesIncludingDeprecated,
  EffectiveLineStringBody,
  EffectiveMultiLineStringBody,
};
