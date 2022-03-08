import Joi from 'joi';

export type IssueTriggerRule = {
  clientHashId: string
  deviceTypeHashId?: string
  priorityLevel: 1 | 2
  missedReports: number
  offlineForSeconds: number
}

export const schema = Joi.object().keys({
  clientHashId: Joi.string().required().example('xd2rd4'),
  deviceTypeHashId: Joi.string().example('xd2rd4'),
  priorityLevel: Joi.number().integer().valid(1, 2).required()
    .example('1'),
  missedReports: Joi.number().integer().required().example('12'),
  offlineForSeconds: Joi.number().integer().required().example('1800'),
});
