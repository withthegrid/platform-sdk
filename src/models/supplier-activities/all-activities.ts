import Joi from 'joi';

import { schema as dropCommandSchema, DropCommand } from './drop-command';
import { schema as handleCommandDueSchema, HandleCommandDue } from './handle-command-due';
import { schema as handleDeletedCommandSchema, HandleDeletedCommand } from './handle-deleted-command';
import { schema as handleIncomingRequestSchema, HandleIncomingRequest } from './handle-incoming-request';
import { schema as handleLinkSchema, HandleLink } from './handle-link';
import { schema as handleLinkUpdateSchema, HandleLinkUpdate } from './handle-link-update';
import { schema as handleNewCommandSchema, HandleNewCommand } from './handle-new-command';
import { schema as handleUnlinkSchema, HandleUnlink } from './handle-unlink';
import { schema as increaseReportingCounterSchema, IncreaseReportingCounter } from './increase-reporting-counter';
import { schema as markCommandAsSentSchema, MarkCommandAsSent } from './mark-command-as-sent';
import { schema as parseReportSchema, ParseReport } from './parse-report';
import { schema as scheduleCommandSchema, ScheduleCommand } from './schedule-command';
import { schema as sendRequestSchema, SendRequest } from './send-request';
import { schema as setDeviceFieldsSchema, SetDeviceFields } from './set-device-fields';
import { schema as expectNextReportBeforeSchema, ExpectNextReportBefore } from './expect-next-report-before';

type AllActivities = DropCommand
  | HandleCommandDue
  | HandleDeletedCommand
  | HandleIncomingRequest
  | HandleLink
  | HandleLinkUpdate
  | HandleNewCommand
  | HandleUnlink
  | IncreaseReportingCounter
  | MarkCommandAsSent
  | ParseReport
  | ScheduleCommand
  | SendRequest
  | SetDeviceFields
  | ExpectNextReportBefore;

const schema = (apiVersion: number): Joi.AlternativesSchema => Joi.alternatives().try(
  dropCommandSchema,
  handleCommandDueSchema(apiVersion),
  handleDeletedCommandSchema(apiVersion),
  handleIncomingRequestSchema(apiVersion),
  handleLinkSchema(apiVersion),
  handleLinkUpdateSchema(apiVersion),
  handleNewCommandSchema(apiVersion),
  handleUnlinkSchema(apiVersion),
  increaseReportingCounterSchema,
  markCommandAsSentSchema,
  parseReportSchema(apiVersion),
  scheduleCommandSchema,
  sendRequestSchema,
  setDeviceFieldsSchema,
  expectNextReportBeforeSchema,
);

export { schema, AllActivities };
