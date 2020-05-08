import Joi from '@hapi/joi';


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
  identifier: Joi.string().required().example(identifierExample).description('A javascript function that parses the incoming request into a device identifier and report type hashId. See [add link]'),
  createdAt: Joi.date().required().example('2019-12-31T15:23Z'),
})
  .tag('supplierWebhook')
  .description('Information about a webhook that listens to incoming messages from device (gateways)');


interface SupplierWebhook {
  hashId: string;
  name: string;
  identifier: string;
  createdAt: Date;
}

export { schema, SupplierWebhook, identifierExample };
