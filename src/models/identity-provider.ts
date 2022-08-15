import Joi from 'joi';

interface IdentityProvider {
  hashId: string;
  name: string;
  url: string;
  ssoClientId: string;
  defaultLocale: string;
}

const schema = (): Joi.ObjectSchema => Joi.object().keys({
  hashId: Joi.string().required().example('wasd2'),
  name: Joi.string().required(),
  url: Joi.string().required().example('https://login.microsoftonline.com/abvsd23fasdfasdf/v2.0/.well-known/openid-configuration'),
  ssoClientId: Joi.string().required().example('e39cb59e-3a74-48cc-a71d-77b8ef037ec9'),
  defaultLocale: Joi.string().default('en').required(),
});

export { schema, IdentityProvider };
