import Joi from '@hapi/joi';
import { baseSchema as deviceTypeSchema, DeviceType } from './device-type';

const eventHandlerExample = `function (command) {
  return JSON.stringify({
    hashId: command.hashId,
    commandTypeHashId: command.commandTypeHashId,
    startAt: command.startAt,
    endAt: command.endAt,
    settings: command.settings,
  });
}`;


const schema = deviceTypeSchema.keys({
  eventHandler: Joi.string().required().example(eventHandlerExample).description('A javascript function that handles an events. See [add link]'),
})
  .tag('supplierDeviceType')
  .description('Information about the type of device');


interface SupplierDeviceType extends DeviceType {
  eventHandler: string;
}

export {
  schema, SupplierDeviceType, eventHandlerExample,
};
