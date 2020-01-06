import Joi from '@hapi/joi';

const schema = Joi.object().keys({
  hashId: Joi.string().required().example('r5a5a'),
  pinHashId: Joi.string().required().example('e13d57'),
  edgeHashId: Joi.string().required().example('ka08d'),
  nodeHashId: Joi.string().allow(null).required().example('qp111a')
    .description('One of the two endpoints of the provided edge hashId or null.'),
  deletedAt: Joi.date().allow(null).required().example(null),
})
  .description('Connects a pin to an edge. Pins can be connected to multiple edges and edges can be connected to multiple pins.')
  .tag('pinLink');


interface PinLink {
  hashId: string;
  pinHashId: string;
  edgeHashId: string;
  nodeHashId: string | null;
  deletedAt: Date | null;
}

export { schema, PinLink };
