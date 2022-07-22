import Joi from 'joi';

interface DomainIdentityProvider {
  hashId: string;
  domain: string;
  identityProviderHashId: string;
}

const schema = (): Joi.ObjectSchema => Joi.object().keys({
  hashId: Joi.string().required().example('wasd2'),
  domain: Joi.string().required().example('withthegrid.com'),
  identityProviderHashId: Joi.string().required().example('wasd2'),
});

export { schema, DomainIdentityProvider };
