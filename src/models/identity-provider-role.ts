import Joi from 'joi';

interface IdentityProviderRole {
  hashId: string;
  identityProviderHashId: string;
  clientHashId?: string;
  supplierHashId?: string;
  role: string;
  rights: string[];
}

const schema = (): Joi.ObjectSchema => Joi.object().keys({
  hashId: Joi.string().required().example('wasd2'),
  identityProviderHashId: Joi.string().required().example('ds23d'),
  clientHashId: Joi.string().example('as31db'),
  supplierHashId: Joi.string().example('a2f1da'),
  role: Joi.string().required(),
  rights: Joi.array().items(Joi.string().example('READ')).required(),
});

export { schema, IdentityProviderRole };
