import Joi from 'joi';

const colorSchema = Joi.string().required().example('#ff00ff').regex(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
const colorsSchema = Joi.object().keys({
  primary: colorSchema,
  secondary: colorSchema,
  accent: colorSchema,
  error: colorSchema,
  warning: colorSchema,
  info: colorSchema,
  success: colorSchema,
  neutral: colorSchema,
});

/**
 * @internal
 */
export const themeSchema = Joi.object().keys({
  name: Joi.string().example('My new theme').required(),
  light: colorsSchema.required(),
  dark: colorsSchema.optional(),
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
