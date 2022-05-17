import { localesKeys, LocalesKeys } from '../../src/models/translations';
import { AggregatedColumn, UnaggregatedColumn } from '../../src/models/analytics-query';
import { analyticsTables, getColumnPlaceholder } from '../../src/models/analytics/analytics-tables';

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

describe('pluralization keys', () => {
  describe('given a table key', () => {
    describe('when I ask for the table name translation of said key', () => {
      it('then it returns the l10n keys', () => {
        // act
        const tableName = analyticsTables.getTableName('clientReportType');

        // assert
        expect(tableName).toHaveProperty('en');
        expect(tableName).toHaveProperty('nl');
        expect(tableName).toHaveProperty('en.singular', 'Report type');
        expect(tableName).toHaveProperty('en.plural', 'Report types');
        expect(tableName).toHaveProperty('nl.singular', 'Rapportsoort');
        expect(tableName).toHaveProperty('nl.plural', 'Rapportsoorten');
      });

      describe('and when I ask to format the result', () => {
        it('then it returns the formatted result', () => {
          // arrange
          const formatterSpy = jest.fn().mockImplementation(
            // dummy formatting
            (tr) => `${tr.en.singular} | ${tr.nl.plural}`,
          );
          const tableName = analyticsTables.getTableName('clientReportType');

          // act
          const formatted = tableName.format(formatterSpy);

          // assert
          expect(formatterSpy).toHaveBeenCalledTimes(1);
          expect(formatterSpy).toHaveBeenCalledWith(analyticsTables.clientReportType.tableText);
          expect(formatted).toEqual('Report type | Rapportsoorten');
        });
      });

      describe('and when I ask for the translation of a field', () => {
        it('then it returns the l10n keys (pluralized)', () => {
          // arrange
          const tableName = analyticsTables.getTableName('clientReportType');

          // act
          const field = tableName.getField('name');

          // assert
          expect(field).toHaveProperty('en');
          expect(field).toHaveProperty('nl');
          expect(field).toHaveProperty('en.singular', 'Name');
          expect(field).toHaveProperty('en.plural', 'Names');
          expect(field).toHaveProperty('nl.singular', 'Naam');
          expect(field).toHaveProperty('nl.plural', 'Namen');
        });

        it('then it returns the l10n keys (not pluralized)', () => {
          // arrange
          const tableName = analyticsTables.getTableName('clientReportType');

          // act
          const field = tableName.getField('createdAt');

          // assert
          expect(field).toHaveProperty('en', 'Created at');
          expect(field).toHaveProperty('nl', 'Aangemaakt op');
        });

        describe('and when I ask to format the result', () => {
          it('then it returns the formatted result (pluralized)', () => {
            // arrange
            const formatterSpy = jest.fn().mockImplementation(
              // dummy formatting
              (tr) => `${tr.en.singular} | ${tr.nl.plural}`,
            );
            const tableName = analyticsTables.getTableName('clientReportType');
            const field = tableName.getField('name');

            // act
            const formatted = field.format(formatterSpy);

            // assert
            expect(formatterSpy).toHaveBeenCalledTimes(1);
            expect(formatterSpy).toHaveBeenCalledWith({
              en: { singular: 'Name', plural: 'Names' },
              nl: { singular: 'Naam', plural: 'Namen' },
            });
            expect(formatted).toEqual('Name | Namen');
          });

          it('then it returns the formatted result (not pluralized)', () => {
            // arrange
            const formatterSpy = jest.fn().mockImplementation(
              // dummy formatting
              (tr) => `${tr.en} | ${tr.nl}`,
            );
            const tableName = analyticsTables.getTableName('clientReportType');
            const field = tableName.getField('createdAt');

            // act
            const formatted = field.format(formatterSpy);

            // assert
            expect(formatterSpy).toHaveBeenCalledTimes(1);
            expect(formatterSpy).toHaveBeenCalledWith({
              en: 'Created at',
              nl: 'Aangemaakt op',
            });
            expect(formatted).toEqual('Created at | Aangemaakt op');
          });
        });
      });
    });
  });

  describe('given a tableKey:fieldKey key', () => {
    describe('when I ask for the translation of the combined keys', () => {
      it('then it return all the l10nKeys', () => {
        // act
        const [table, field] = analyticsTables.getTableNameAndField('clientReportType.name');

        // assert
        expect(table).toBeDefined();
        expect(field).toBeDefined();

        // took random assertions from before
        expect(table).toHaveProperty('en.singular', 'Report type');
        expect(field).toHaveProperty('nl.plural', 'Namen');
      });
    });
  });
});
