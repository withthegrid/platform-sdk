import Joi from 'joi';

const schema = Joi.object().keys({
  notificationLevel: Joi.number().valid(0, 1, 2).allow(null).required()
    .example(0)
    .description('The user is subscribed to every issue created on locations in this environment (0), when the issue gets serious (1) or when the issue gets critical (2). If null, the user is not autmatically subscribed to new issues.'),
  defaultAnalyticsPanelHashId: Joi.string().allow(null).example('7usgt').required(),
})
  .description('User speficic settings for an environment')
  .tag('userEnvironmentSettings');

interface UserEnvironmentSettings {
  notificationLevel: 0 | 1 | 2 | null;
  defaultAnalyticsPanelHashId: string | null;
}

export { schema, UserEnvironmentSettings };
