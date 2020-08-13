import Joi from 'joi';

import { schema as fieldsToFieldConfigurationUdfSchema, FieldsToFieldConfigurationUdf } from '../fields/fields-to-field-configuration-udf';
import { schemaConstructor as supplierActivityConstructor, SupplierActivity } from './base';

interface SetDeviceFields extends SupplierActivity<'setDeviceFields'> {
  triggerData: {
    diff?: {
      old: FieldsToFieldConfigurationUdf;
      new: FieldsToFieldConfigurationUdf;
    };
  };
}

const schema = supplierActivityConstructor(
  'setDeviceFields',
  Joi.object().keys({
    diff: Joi.object().keys({
      old: fieldsToFieldConfigurationUdfSchema.required(),
      new: fieldsToFieldConfigurationUdfSchema.required(),
    }).example({ old: { version: '1.1' }, new: { version: '1.2' } }),
  }).required(),
)
  .tag('supplierActivitySetDeviceFields')
  .description('Supplier defined function that updates a device\'s fields.');

export { schema, SetDeviceFields };
