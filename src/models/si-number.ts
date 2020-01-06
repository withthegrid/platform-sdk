import Joi from '@hapi/joi';

const schema = Joi.object().keys({
  orderOfMagnitude: Joi.number().integer().min(-128).max(127)
    .required()
    .example(0),
  significand: Joi.number().integer().min(-2147483648).max(2147483647)
    .required()
    .example(1500),
})
  .description('Significant number. Its value is significand * 10 ^ orderOfMagnitude. It has as many significant figures as the significand has (except when the significand is 0, then the number of significant figures is not defined)')
  .tag('siNumber');


interface SiNumber {
  orderOfMagnitude: number;
  significand: number;
}

export { schema, SiNumber };
