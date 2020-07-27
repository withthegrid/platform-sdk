import Joi from '@hapi/joi';

interface FileToServer {
  dataUrl: string;
  name?: string;
}

const schema = Joi.object().keys({
  dataUrl: Joi.string().required().example('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==').description('Layout should be "data:<mediatype>;base64,<data>", see https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL'),
  name: Joi.string().example('red-dot.png').description('The filename including extension'),
})
  .tag('fileToServer')
  .description('Data that should should be sent to the server when uploading a file');

export {
  schema,
  FileToServer,
};
