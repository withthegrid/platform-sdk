import Joi from '@hapi/joi';

const schema = Joi.object().keys({
  hashId: Joi.string().required().example('3a78q91'),
  requestorType: Joi.string().required(),
  requestorHashId: Joi.string().required(),
  url: Joi.string().required().example('https://api.withthegrid.com/file/3a78q91?exp=null&sig=795d221ccd09fb0bfadfb74770fe0b7c'),
  signature: Joi.string().required().example('795d221ccd09fb0bfadfb74770fe0b7c'),
  name: Joi.string().allow(null).required().example('my photo.png'),
  mimeType: Joi.string().allow(null).required().example('image/png'),
  bytes: Joi.number().integer().required().example(5312),
  md5: Joi.string().required().example('56ac656c7f932c5b775be28949e90af9a2356eae2826539f10ab6526a0eec762'),
  crc32: Joi.string().required().example('1ae39519'),
  expiresAt: Joi.date().allow(null).required().example(null),
})
  .tag('fileFromServer')
  .description('Information about a stored file that can be used to download or inline it');

interface FileFromServer {
  hashId: string;
  requestorType: string;
  requestorHashId: string;
  url: string;
  signature: string;
  name: string | null;
  mimeType: string | null;
  bytes: number;
  md5: string;
  crc32: string;
  expiresAt: Date | null;
}

export {
  schema,
  FileFromServer,
};
