import Joi from 'joi';

const identifierExample = `function (command) {
  return JSON.stringify({
    hashId: command.hashId,
    commandTypeHashId: command.commandTypeHashId,
    startAt: command.startAt,
    endAt: command.endAt,
    settings: command.settings,
  });
}`;

const schema = Joi.object().keys({
  hashId: Joi.string().required().example('z812a63'),
  name: Joi.string().required().example('My webhook'),
  shimable: Joi.number().required().example(0),
  createdAt: Joi.date().required().example('2019-12-31T15:23Z'),
})
  .tag('supplierWebhook')
  .meta({ className: 'supplierWebhook' })
  .description('Information about a webhook that listens to incoming messages from device (gateways)');

interface SupplierWebhook {
  hashId: string;
  name: string;
  shimable: number;
  createdAt: Date;
}

export { schema, SupplierWebhook, identifierExample };
