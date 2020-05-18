import Joi from '@hapi/joi';

import { baseSchema as baseReportTypeSchema, ReportType } from './report-type';

const parserExample = `function (command) {
  return JSON.stringify({
    hashId: command.hashId,
    commandTypeHashId: command.commandTypeHashId,
    startAt: command.startAt,
    endAt: command.endAt,
    settings: command.settings,
  });
}`;


const schema = baseReportTypeSchema.keys({
  parser: Joi.string().required().example(parserExample).description('A javascript function that parses an incoming report. See [add link]'),
})
  .description('An object defining what a device measurement report should look like')
  .tag('supplierReportType');

interface SupplierReportType extends ReportType {
  parser: string;
}

export { schema, SupplierReportType, parserExample };
