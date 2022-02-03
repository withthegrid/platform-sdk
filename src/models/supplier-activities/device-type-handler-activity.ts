import Joi from 'joi';

import { schema as dropCommandSchema, DropCommand } from './drop-command';
import { schema as increaseReportingCounterSchema, IncreaseReportingCounter } from './increase-reporting-counter';
import { schema as scheduleCommandSchema, ScheduleCommand } from './schedule-command';
import { schema as markCommandAsSentSchema, MarkCommandAsSent } from './mark-command-as-sent';
import { schema as parseReportSchema, ParseReport } from './parse-report';
import { schema as sendRequestSchema, SendRequest } from './send-request';
import { schema as setDeviceFieldsSchema, SetDeviceFields } from './set-device-fields';
import { schema as expectNextReportBeforeSchema, ExpectNextReportBefore } from './expect-next-report-before';

type DeviceTypeHandlerActivity = DropCommand
  | IncreaseReportingCounter
  | MarkCommandAsSent
  | ParseReport
  | ScheduleCommand
  | SendRequest
  | SetDeviceFields
  | ExpectNextReportBefore;

const schema = (apiVersion: number): Joi.AlternativesSchema => Joi.alternatives().try(
  dropCommandSchema,
  increaseReportingCounterSchema,
  markCommandAsSentSchema(apiVersion),
  parseReportSchema(apiVersion),
  scheduleCommandSchema(apiVersion),
  sendRequestSchema,
  setDeviceFieldsSchema,
  expectNextReportBeforeSchema,
);

export { schema, DeviceTypeHandlerActivity };
