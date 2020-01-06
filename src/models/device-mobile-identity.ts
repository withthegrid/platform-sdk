import Joi from '@hapi/joi';

const schema = Joi.object().keys({
  hashId: Joi.string().required().example('h874a1'),
  model: Joi.string().allow('').required().example('SARA-G350'),
  imei: Joi.string().allow('').required().example('990000862471854'),
  iccid: Joi.string().allow('').required().example('8901260232714958936F'),
  imsi: Joi.string().allow('').required().example('310150123456789'),
})
  .tag('deviceMobileIdentity')
  .description('Information about the cellular identifiers of a device');


interface DeviceMobileIdentity {
  hashId: string;
  model: string;
  imei: string;
  iccid: string;
  imsi: string;
}

export { schema, DeviceMobileIdentity };
