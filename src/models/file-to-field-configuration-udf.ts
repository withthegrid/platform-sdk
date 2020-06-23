import Joi from '@hapi/joi';

const schema = Joi.object().keys({
  name: Joi.string().allow(null).required().example('my photo.png'),
  mimeType: Joi.string().allow(null).required().example('image/png'),
  bytes: Joi.number().integer().required().example(5312),
})
  .tag('fileToFieldConfigurationUdf')
  .description('Information about a file that is passed to the user defined functions in a field configuration (eg. validator)');

interface FileToFieldConfigurationUdf {
  name: string | null;
  mimeType: string | null;
  bytes: number;
}

export {
  schema,
  FileToFieldConfigurationUdf,
};
