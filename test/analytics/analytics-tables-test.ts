import { AggregatedColumn, TimeGroupColumn, UnaggregatedColumn } from '../../src/models/analytics-query';
import { getColumnPlaceholder } from '../../src/models/analytics/analytics-tables';

test('test column names for analytics columns (pinGroup.hashId)', () => {
  const column: UnaggregatedColumn = {
    type: undefined,
    field: 'pinGroup.hashId',
  };
  expect(getColumnPlaceholder(column, 'nl')).toBe('Locatie:id');
  expect(getColumnPlaceholder(column, 'en')).toBe('Location:id');
});

test('test column names for analytics columns (pinGroup.fields.id)', () => {
  const column: UnaggregatedColumn = {
    type: undefined,
    field: 'pinGroup.fields.id',
  };
  expect(getColumnPlaceholder(column, 'nl')).toBe('Locatie:id');
  expect(getColumnPlaceholder(column, 'en')).toBe('Location:id');
});

test('test column names for analytics columns (measurement.value)', () => {
  const column: UnaggregatedColumn = {
    type: undefined,
    field: 'measurement.value',
  };
  expect(getColumnPlaceholder(column, 'nl')).toBe('Meting:waarde');
  expect(getColumnPlaceholder(column, 'en')).toBe('Measurement:value');
});

test('test column names for analytics columns (pin.deviceFields.devTyChannelFormField)', () => {
  const column: UnaggregatedColumn = {
    type: undefined,
    field: 'pin.deviceFields.devTyChannelFormField',
  };
  expect(getColumnPlaceholder(column, 'nl')).toBe('Poort:device formulierveld "devTyChannelFormField"');
  expect(getColumnPlaceholder(column, 'en')).toBe('Port:device form field "devTyChannelFormField"');
});

test('test column names for analytics columns (measurement.value)', () => {
  const column: UnaggregatedColumn = {
    type: undefined,
    field: 'measurement.value',
  };
  expect(getColumnPlaceholder(column, 'nl')).toBe('Meting:waarde');
  expect(getColumnPlaceholder(column, 'en')).toBe('Measurement:value');
});

test('test column names for analytics columns (pin.deviceFields.devTyChannelFormField)', () => {
  const column: AggregatedColumn = {
    type: 'any',
    field: 'pin.deviceFields.devTyChannelFormField',
  };
  expect(getColumnPlaceholder(column, 'nl')).toBe('Een(Poort:device formulierveld "devTyChannelFormField")');
  expect(getColumnPlaceholder(column, 'en')).toBe('Any(Port:device form field "devTyChannelFormField")');
});

test('test column names for analytics columns (count)', () => {
  const column: AggregatedColumn = {
    type: 'count',
  };
  expect(getColumnPlaceholder(column, 'nl')).toBe('Aantal');
  expect(getColumnPlaceholder(column, 'en')).toBe('Count');
});

test('test column names for analytics columns (timegroup day measurement generated at)', () => {
  const column: TimeGroupColumn = {
    type: 'timeGroup',
    granularity: 'day',
    field: 'measurement.generatedAt',
  };
  expect(getColumnPlaceholder(column, 'nl')).toBe('Dag(Meting:gemeten op)');
  expect(getColumnPlaceholder(column, 'en')).toBe('Day(Measurement:measured at)');
});

test('test column names for analytics columns (condition on min)', () => {
  const column: AggregatedColumn = {
    type: 'min',
    field: 'measurement.value',
    condition: {
      type: 'or',
      restrictions: [
        {
          comparison: '>',
          left: 'measurement.value',
          right: { value: '200' },
        },
      ],
    },
  };
  expect(getColumnPlaceholder(column, 'nl')).toBe('Min*(Meting:waarde)');
  expect(getColumnPlaceholder(column, 'en')).toBe('Min*(Measurement:value)');
});
