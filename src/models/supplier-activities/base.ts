import Joi from '@hapi/joi';

interface SupplierActivity<TriggerType extends string> {
  hashId: string;
  createdAt: Date;
  triggerType: TriggerType;
  failed: boolean;
  log: {
    type: 'error' | 'log';
    message: string;
    lineNumber?: number;
    columnNumber?: number;
  }[];
}

function schemaConstructor(
  triggerType: string,
  triggerData: Joi.AnySchema | undefined = undefined,
  activity: Joi.AnySchema | undefined = undefined,
): Joi.ObjectSchema {
  let schema = Joi.object().keys({
    hashId: Joi.string().required().example('2ad91p'),
    createdAt: Joi.date().required().example('2019-12-31T15:23Z'),
    triggerType: Joi.string().valid(triggerType).required().example(triggerType),
    failed: Joi.boolean().required().example(false),
    log: Joi.array().items(Joi.object().keys({
      type: Joi.string().valid('error', 'log').required(),
      message: Joi.string().required(),
      lineNumber: Joi.number(),
      columnNumber: Joi.number(),
    }).required()).required(),
  }).required();

  if (triggerData !== undefined) {
    schema = schema.keys({ triggerData });
  }
  if (activity !== undefined) {
    schema = schema.keys({ activities: Joi.array().items(activity).required() });
  }
  return schema;
}

export { schemaConstructor, SupplierActivity };
