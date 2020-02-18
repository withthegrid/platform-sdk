import Joi from '@hapi/joi';

const schema = Joi.object().keys({
  hashId: Joi.string().required().example('u98a24'),
  name: Joi.string().required().example('Fix this month'),
  color: Joi.string().pattern(/^#[a-fA-F\d]{6}$/).required().description('#, followed by six hexadecimal characters')
    .example('#ff0000'),
  createdAt: Joi.date().required().example('2019-12-31T15:23Z'),
  updatedAt: Joi.date().required().example('2019-12-31T15:23Z'),
  deletedAt: Joi.date().allow(null),
})
  .description('A label can be used to tag issues with.')
  .tag('label');


interface Label {
  hashId: string;
  name: string;
  color: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export { schema, Label };
