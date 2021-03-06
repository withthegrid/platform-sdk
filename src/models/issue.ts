import Joi from 'joi';

const schema = Joi.object().keys({
  hashId: Joi.string().required().example('c19aid'),
  userHashId: Joi.string().allow(null).required().example('b45zo0'),
  assignedUserHashId: Joi.string().allow(null).required().example(null),
  title: Joi.string().required().example('Temperature is too high'),
  level: Joi.number().integer().valid(0, 1, 2).required()
    .example(0),
  typeKey: Joi.string().valid('missing', 'incorrect', 'unexpected', 'unrelated').required()
    .example('missing'),
  startAt: Joi.date().required().example('2019-12-31T15:23Z'),
  endAt: Joi.date().required().allow(null)
    .example(null)
    .description('If null, the issue is still open'),
  createdAt: Joi.date().required().example('2019-12-31T15:23Z'),
  updatedAt: Joi.date().required().example('2019-12-31T15:23Z'),
  deletedAt: Joi.date().allow(null),
})
  .description('A problem or remark about a specific pin group (or pin).')
  .tag('issue');

interface Issue {
  hashId: string;
  userHashId: string | null;
  assignedUserHashId: string | null;
  title: string;
  level: 0 | 1 | 2;
  typeKey: 'missing' | 'incorrect' | 'unexpected' | 'unrelated';
  startAt: Date;
  endAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export { schema, Issue };
