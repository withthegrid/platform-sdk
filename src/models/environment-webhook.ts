import Joi from 'joi';

const schema = Joi.object().keys({
  device_type_id: Joi.string().required().example('xd2rd4'),
  client_id: Joi.string().required().example('1'),
  token: Joi.string().required().example('f8b0e692cb60c607e4eee49bde8552e0f09836079d0c714ef87536dc9a38e21fd06d0ff45bf8e2365c94d111800ec0ab8dd953bbdb823fec2c44959ed3a19df'),
  createdAt: Joi.date().required().example('2022-05-17T12:34Z'),
})
  .tag('environmentWebhook')
  .meta({ className: 'environmentWebhook' })
  .description('Shared device-type webhook');

interface EnvironmentWebhook {
  device_type_id: string;
  client_id: string;
  token: string;
  createdAt: Date;
}

export { schema, EnvironmentWebhook };
