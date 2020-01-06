import Joi from '@hapi/joi';

const schema = Joi.object().keys({
  interval: Joi.number().integer().valid( // In seconds
    10,
    60,
    300,
    600,
    900,
    1200,
    1800,
    3600,
    7200,
    10800,
    14400,
    21600,
    28800,
    43200,
    86400,
    172800,
    604800,
    null,
  )
    .required()
    .description('Schedule where every [interval] seconds measurements are taken. Starts at Thursday midnight UTC.')
    .example(86400),
  fixed: Joi
    .array()
    .items(Joi.number().integer().min(0).max(86399))
    .min(1)
    .max(5)
    .allow(null)
    .required()
    .description('If not null, represents a schedule where measurements are taken at the provided numbers, in seconds after midgnight UTC')
    .example(null),
})
  .description('The pattern in which a device should take measurements')
  .tag('measurementCycle');


interface MeasurementCycle {
  interval: number | null;
  fixed: number[] | null;
}

export { schema, MeasurementCycle };
