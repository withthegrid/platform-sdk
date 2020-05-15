import Joi from '@hapi/joi';

interface FileToServer {
  dataUrl: string;
  name?: string;
}

const schema = Joi.object().keys({
  dataUrl: Joi.string().required().description('Layout should be "data:<mediatype>;base64,<data>", see https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL'),
  name: Joi.string().description('The filename including extension'),
})
  .tag('fileToServer')
  .description('Data that should should be sent to the server when uploading a file');

export {
  schema,
  FileToServer,
};
