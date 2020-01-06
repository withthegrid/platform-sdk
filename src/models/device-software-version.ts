import Joi from '@hapi/joi';

const schema = Joi.object().keys({
  hashId: Joi.string().required().example('i096a1'),
  applicationVersion: Joi.string().allow('').required().example('1.2.3'),
  systemVersion: Joi.string().allow('').required().example('1.2.3'),
  osVersion: Joi.string().allow('').required().example('1.2.3'),
})
  .tag('deviceSoftwareVersion')
  .description('Information about the software version of a device');


interface DeviceSoftwareVersion {
  hashId: string;
  applicationVersion: string;
  systemVersion: string;
  osVersion: string;
}

export { schema, DeviceSoftwareVersion };
