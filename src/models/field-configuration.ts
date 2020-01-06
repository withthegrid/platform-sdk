import Joi from '@hapi/joi';


const schema = Joi.object().keys({
  key: Joi.string().pattern(/^[a-z][a-zA-Z\d]*$/).required().example('id'),
  name: Joi.string().required().example('ID as used in our geographic information system'),
  valueOptions: Joi.array().items(Joi.object().keys({
    text: Joi.string().required(),
    value: Joi.string().required(),
  })).allow(null)
    .default(null)
    .description('If null, use text field, otherwise, use select field'),
  prefix: Joi.string(),
  suffix: Joi.string(),
  hint: Joi.string().allow('').default('').description('As shown near the input field'),
})
  .tag('fieldConfiguration')
  .description('Defines which data can be stored on objects of a certain type. See the open fields chapter for more detail.');

interface ValueOption {
  text: string;
  value: string;
}

interface FieldConfiguration {
  key: string;
  name: string;
  valueOptions?: ValueOption[] | null;
  prefix?: string;
  suffix?: string;
  hint?: string;
}

export { schema, FieldConfiguration };
