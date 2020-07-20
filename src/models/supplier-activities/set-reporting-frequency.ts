import Joi from '@hapi/joi';

import { schemaConstructor as supplierActivityConstructor, SupplierActivity } from './base';
import { schema as measurementCycleSchema, MeasurementCycle } from '../measurement-cycle';

interface SetReportingFrequency extends SupplierActivity<'setReportingFrequency'> {
  triggerData: {
    measurementCycle?: MeasurementCycle;
  };
}

const schema = supplierActivityConstructor(
  'setReportingFrequency',
  Joi.object().keys({
    measurementCycle: measurementCycleSchema,
  }).required(),
)
  .tag('supplierActivitySetReportingFrequency')
  .description('Supplier defined function set the reporting frequency of a specific device to a specific interval. The system uses this information to monitor connectivity of the device and raises an issue if it fails to report in time.');

export { schema, SetReportingFrequency };
