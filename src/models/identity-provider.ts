import Joi from 'joi';

interface IdentityProvider {
  hashId: string;
  name: string;
  url: string;
  ssoClientId: string;
}

const schema = (): Joi.ObjectSchema => Joi.object().keys({
  hashId: Joi.string().required().example('wasd2'),
  name: Joi.string().required(),
  url: Joi.string().required().example('https://login.microsoftonline.com/abvsd23fasdfasdf/v2.0/.well-known/openid-configuration'),
  ssoClientId: Joi.string().required().example('ed055c9d-c3b9-449a-818e-5ffd18d49f98'),
});

export { schema, IdentityProvider };
