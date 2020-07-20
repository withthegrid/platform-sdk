import Joi from '@hapi/joi';

const schema = Joi.object().keys({
  hashId: Joi.string().required().example('sajia1'),
  name: Joi.string().required().example('Temperature'),
  unit: Joi.string().required().example('K').description('Will be displayed with an SI-prefix (eg. k or M) if relevant'),
})
  .tag('quantity');

interface Quantity {
  hashId: string;
  name: string;
  unit: string;
}

export { schema, Quantity };
