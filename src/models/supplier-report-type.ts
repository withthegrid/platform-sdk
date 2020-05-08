import Joi from '@hapi/joi';

import { schema as fieldConfigurationSchema, FieldConfiguration } from './field-configuration';

const parserExample = `function (command) {
  return JSON.stringify({
    hashId: command.hashId,
    commandTypeHashId: command.commandTypeHashId,
    startAt: command.startAt,
    endAt: command.endAt,
    settings: command.settings,
  });
}`;


const schema = Joi.object().keys({
  hashId: Joi.string().required().example('y124as'),
  name: Joi.string().required().example('Temperature'),
  fieldConfigurations: Joi.object().keys({
    pinGroup: Joi.array().items(fieldConfigurationSchema).required(),
    pin: Joi.array().items(fieldConfigurationSchema).required(),
    measurement: Joi.array().items(fieldConfigurationSchema).required(),
  }).required()
    .description('See the chapter on open fields on how to use this'),
  parser: Joi.string().required().example(parserExample).description('A javascript function that parses an incoming report. See [add link]'),
  deletedAt: Joi.date().allow(null).required().example(null),
})
  .description('An object defining what a device measurement report should look like')
  .tag('supplierReportType');


interface SupplierReportType {
  hashId: string;
  name: string;
  fieldConfigurations: {
    pinGroup: FieldConfiguration[];
    pin: FieldConfiguration[];
    measurement: FieldConfiguration[];
  };
  parser: string;
  deletedAt: Date | null;
}

export { schema, SupplierReportType, parserExample };
