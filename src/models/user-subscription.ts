import Joi from 'joi';

const schema = Joi.object().keys({
  hashId: Joi.string().required().example('dfa1p'),
  objectType: Joi.string().valid(
    'supplierReportType',
    'deviceType',
    'supplierWebhook',
    'supplierCertificate',
  ).required().example('deviceType'),
  objectHashId: Joi.string().required().example('wasd2'),
  lastNotification: Joi.date().allow(null).required().example('2020-01-31T11:17Z'),
  alertsSinceLastNotification: Joi.number().integer().required().example(0),
  createdAt: Joi.date().required().example('2019-12-31T15:23Z'),
})
  .tag('userSubscription')
  .description('Objects the user want to receive email notifications on');

interface UserSubscription {
  hashId: string;
  objectType: 'supplierReportType' | 'deviceType' | 'supplierWebhook' | 'supplierCertificate';
  objectHashId: string;
  lastNotification: Date | null;
  alertsSinceLastNotification: number;
  createdAt: Date;
}

export { schema, UserSubscription };
