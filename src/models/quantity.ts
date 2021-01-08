import Joi from 'joi';

const schema = Joi.object().keys({
  hashId: Joi.string().required().example('sajia1'),
  name: Joi.string().required().example('Temperature'),
  unit: Joi.string().required().example('K').description('Will be displayed with an SI-prefix (eg. k or M) if relevant'),
  defaultOrderOfMagnitude: Joi.number().integer().min(-128).max(127)
    .default(0)
    .example(3)
    .description('Defines default order of magnitude to be selected at manual report form'),
})
  .tag('quantity');

interface Quantity {
  hashId: string;
  name: string;
  unit: string;
  defaultOrderOfMagnitude: number;
}

export { schema, Quantity };
