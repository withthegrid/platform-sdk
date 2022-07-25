import Joi from 'joi';

const colorSchema = Joi.object().keys({
  primary: Joi.string().required().example('#ff00ff'),
  secondary: Joi.string().required().example('#ff00ff'),
  accent: Joi.string().required().example('#ff00ff'),
  error: Joi.string().required().example('#ff00ff'),
  warning: Joi.string().required().example('#ff00ff'),
  info: Joi.string().required().example('#ff00ff'),
  success: Joi.string().required().example('#ff00ff'),
  neutral: Joi.string().required().example('#ff00ff'),
});

/**
 * @internal
 */
export const themeSchema = Joi.object().keys({
  name: Joi.string().example('My new theme').required(),
  light: colorSchema.required(),
  dark: colorSchema.optional(),
});

type Colors = {
  primary: string;
  secondary: string;
  accent: string;
  error: string;
  warning: string;
  info: string;
  success: string;
  neutral: string;
};

/**
 * @internal
 */
export type Theme = {
  name: string;
  light: Colors;
  dark?: Colors;
};
