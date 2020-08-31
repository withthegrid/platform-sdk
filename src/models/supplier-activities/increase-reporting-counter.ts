import Joi from 'joi';

import { schemaConstructor as supplierActivityConstructor, SupplierActivity } from './base';

interface IncreaseReportingCounter extends SupplierActivity<'increaseReportingCounter'> {
  triggerData: { at?: Date };
}

const schema = supplierActivityConstructor(
  'increaseReportingCounter',
  Joi.object().keys({
    at: Joi.date().example('2019-12-31T15:23Z'),
  }).required(),
)
  .tag('supplierActivityIncreaseReportingCounter')
  .description('User defined function in the connectivity environment that increases the counter that is used to monitor connectivity of the device.');

export { schema, IncreaseReportingCounter };
