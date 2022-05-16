import { localesKeys, LocalesKeys } from '../../src/models/translations';
import { AggregatedColumn, UnaggregatedColumn } from '../../src/models/analytics-query';
import { getColumnPlaceholder } from '../../src/models/analytics/analytics-tables';

describe('analytics-tables placeholders', () => {
  describe('given the column type is undefined (unaggregated)', () => {
    const unaggregatedColumn = (field: string): UnaggregatedColumn => ({
      type: undefined,
      field,
    });

    describe('when I ask for a field placeholder', () => {
      it.each([
        {
          field: 'pinGroup.hashId',
          expected: {
            nl: 'Locatie:id',
            en: 'Location:id',
          },
        },
        {
          field: 'pinGroup.fields.id',
          expected: {
            nl: 'Locatie:id',
            en: 'Location:id',
          },
        },
        {
          field: 'measurement.value',
          expected: {
            nl: 'Meting:waarde',
            en: 'Measurement:value',
          },
        },
      ])('then it returns me a simple placeholder ($field)', ({ field, expected }) => {
        // arrange
        expect.assertions(localesKeys.length);
        const column = unaggregatedColumn(field);

        Object.entries(expected).forEach(([locale, expectedPlaceholder]) => {
          // act
          const placeholder = getColumnPlaceholder(column, locale as LocalesKeys);

          // assert
          expect(placeholder).toEqual(expectedPlaceholder);
        });
      });
    });

    describe('when I ask for a formField placeholder', () => {
      it.each([
        {
          field: 'pin.deviceFields.devTyChannelFormField',
          expected: {
            nl: 'Poort:device formulierveld "devTyChannelFormField"',
            en: 'Port:device form field "devTyChannelFormField"',
          },
        },
      ])('then it returns me a form field placeholder ($field)', ({ field, expected }) => {
        // arrange
        expect.assertions(localesKeys.length);
        const column = unaggregatedColumn(field);

        Object.entries(expected).forEach(([locale, expectedPlaceholder]) => {
          // act
          const placeholder = getColumnPlaceholder(column, locale as LocalesKeys);

          // assert
          expect(placeholder).toEqual(expectedPlaceholder);
        });
      });
    });

    describe('when the field is an object', () => {
      it('then it returns the \'expression\' placeholder', () => {
        // arrange
        const column = {
          field: Object.create(null),
        } as UnaggregatedColumn;

        // act
        const nlPlaceholder = getColumnPlaceholder(column, 'nl');
        const enPlaceholder = getColumnPlaceholder(column, 'en');

        // assert
        expect(nlPlaceholder).toEqual('Berekening');
        expect(enPlaceholder).toEqual('Calculation');
      });
    });
  });

  describe('given I ask for a column with a type (aggregated)', () => {
    it.each([
      {
        name: 'any',
        column: {
          type: 'any',
          field: 'pin.deviceFields.devTyChannelFormField',
        },
        expected: {
          nl: 'Een(Poort:device formulierveld "devTyChannelFormField")',
          en: 'Any(Port:device form field "devTyChannelFormField")',
        },
      },
      {
        name: 'any with \'id\' field',
        column: {
          type: 'any',
          field: 'pin.fields.id',
        },
        expected: {
          nl: 'Een(Poort:id)',
          en: 'Any(Port:id)',
        },
      },
      {
        name: 'any with expression',
        column: {
          type: 'any',
          field: {
            expression: 'stub-expression',
          },
        },
        expected: {
          nl: 'Een(stub-expression)',
          en: 'Any(stub-expression)',
        },
      },
      {
        name: 'count',
        column: {
          type: 'count',
        },
        expected: {
          nl: 'Aantal', en: 'Count',
        },
      },
      {
        name: 'timegroup day measurement generated at',
        column: {
          type: 'timeGroup',
          granularity: 'day',
          field: 'measurement.generatedAt',
        },
        expected: {
          nl: 'Dag(Meting:gemeten op)',
          en: 'Day(Measurement:measured at)',
        },
      },
      {
        name: 'condition on min',
        column: {
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
        },
        expected: {
          nl: 'Min*(Meting:waarde)',
          en: 'Min*(Measurement:value)',
        },
      },
    ])('then it returns me the placeholder ($name)', ({
      column, expected,
    }) => {
      // arrange
      expect.assertions(localesKeys.length);

      Object.entries(expected).forEach(([locale, expectedPlaceholder]) => {
        // act
        const placeholder = getColumnPlaceholder(
          column as AggregatedColumn,
          locale as LocalesKeys,
        );

        // assert
        expect(placeholder).toEqual(expectedPlaceholder);
      });
    });
  });
});
