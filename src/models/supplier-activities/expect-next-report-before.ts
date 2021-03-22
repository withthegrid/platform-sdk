import Joi from 'joi';

import { schemaConstructor as supplierActivityConstructor, SupplierActivity } from './base';

interface ExpectNextReportBefore extends SupplierActivity<'expectNextReportBefore'> {
  triggerData: { before?: Date };
}

const schema = supplierActivityConstructor(
  'expectNextReportBefore',
  Joi.object().keys({
    before: Joi.date().example('2019-12-31T15:23Z'),
  }).required(),
)
  .tag('supplierActivityExpectNextReportBefore')
  .description('User defined function in the connectivity environment that sets the date, before which system will expect to receive next report of a specific device. The system uses this information to monitor connectivity of the device and raises an issue if it fails to report in time.');

export { schema, ExpectNextReportBefore };
