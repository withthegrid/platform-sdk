import Joi from 'joi';

const schema = Joi.object().keys({
  hashId: Joi.string().required().example('f1a4w1'),
  name: Joi.string().required().example('My connectivity environment'),
  createdAt: Joi.date().required().example('2019-12-31T15:23Z'),
})
  .tag('supplier')
  .meta({ className: 'supplier' })
  .description('Is called a connectivity environment in the UI. The space that allows connecting external systems and individual IoT devices to our application, which can be used in one or more monitoring environments. Multiple users can be given access to the same connectivity environment.');

interface Supplier {
  hashId: string;
  name: string;
  createdAt: Date;
}

export { schema, Supplier };
