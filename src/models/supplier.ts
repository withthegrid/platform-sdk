import Joi from '@hapi/joi';


const schema = Joi.object().keys({
  hashId: Joi.string().required().example('f1a4w1'),
  name: Joi.string().required().example('My environment'),
  createdAt: Joi.date().required().example('2019-12-31T15:23Z'),
})
  .tag('supplier')
  .description('The space that allows connecting new IoT sensor types and other new data sources to our platform, which can be used in one or more environments. Multiple users can be given access to the same supplier.');

interface Supplier {
  hashId: string;
  name: string;
  createdAt: Date;
}

export { schema, Supplier };
