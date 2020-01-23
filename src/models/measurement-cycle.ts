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
    .description('Schedule where every [interval] seconds measurements are taken. Starts at Thursday midnight UTC + offset')
    .example(86400),
  fixed: Joi
    .array()
    .items(Joi.number().integer().min(0).max(86399))
    .min(1)
    .max(5)
    .allow(null)
    .default(null)
    .description('If not null, represents a schedule where measurements are taken at the provided numbers, in seconds after midgnight UTC')
    .example(null),
  offset: Joi.number().integer().default(0).min(0)
    .description('In seconds. Should be ignored when interval is null')
    .example(0),
})
  .description('The pattern in which a device should take measurements')
  .tag('measurementCycle');


interface MeasurementCycle {
  interval: number | null;
  fixed: number[] | null;
  offset: number;
}

export { schema, MeasurementCycle };
