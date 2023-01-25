import { apiVersion } from '../src/index';
import { versionedStringOrStringOrTranslationSchema, getTranslatedString, StringOrTranslations } from '../src/models/string-or-translations';
import { schema as quantitySchema, Quantity } from '../src/models/quantity';

test('test get a string out of stringOrTranslations object', () => {
  const stringOrTranslation: StringOrTranslations = 'stringValue';
  expect(getTranslatedString(stringOrTranslation, 'en')).toEqual('stringValue');
});

test('test get translated string out of stringOrTranslations object', () => {
  const stringOrTranslation: StringOrTranslations = {
    en: 'stringEN',
    nl: 'stringNL',
  };
  expect(getTranslatedString(stringOrTranslation, 'en')).toEqual('stringEN');
  expect(getTranslatedString(stringOrTranslation, 'nl')).toEqual('stringNL');
});

test('test get non translated string out an object with only english', () => {
  const stringOrTranslation: StringOrTranslations = {
    en: 'stringEN',
  };
  expect(getTranslatedString(stringOrTranslation, 'en')).toEqual('stringEN');
  expect(getTranslatedString(stringOrTranslation, 'nl')).toEqual('stringEN');
});

describe('versionedStringOrStringOrTranslationSchema', () => {
  const normalStr = 'normalStr';
  const longStr = 'x'.repeat(256);
  const normalObj = {
    en: normalStr,
  };
  const longObj = {
    en: longStr,
  };

  describe('given an api version of 9 and above', () => {
    describe('when I provide a string longer than 255 chars', () => {
      test('it is not a valid schema', () => {
        const result = versionedStringOrStringOrTranslationSchema(apiVersion + 1).validate(longStr);

        expect(result.error).toBeDefined();
        expect(result.error?.details[0].type).toEqual('string.max');

        // extra test to test on a real schema
        const quantity = (len: number): Quantity => ({
          hashId: 'hashId',
          name: {
            en: 'x'.repeat(len),
            nl: 'x'.repeat(len),
          },
          color: '#ffffff',
          defaultOrderOfMagnitude: 1,
          defaultHighThreshold: null,
          defaultLowThreshold: null,
          defaultCriticallyLowThreshold: null,
          defaultCriticallyHighThreshold: null,
          disableSiPrefixes: true,
          unit: 'u',
        });

        let quantityValidation = quantitySchema(apiVersion).validate(quantity(256));

        expect(quantityValidation.error).toBeDefined();
        expect(quantityValidation.error?.details[0].type).toEqual('string.max');

        quantityValidation = quantitySchema(apiVersion).validate(quantity(25));

        expect(quantityValidation.error).not.toBeDefined();
      });
    });

    describe('when I provide an object where one of (or both) string is longer than 255 chars', () => {
      test('it is not a valid schema', () => {
        const result = versionedStringOrStringOrTranslationSchema(apiVersion + 1).validate(longObj);

        expect(result.error).toBeDefined();
        expect(result.error?.details[0].type).toEqual('string.max');
      });
    });
  });

  describe('given an api version below version 9', () => {
    describe('when I provide a string longer than 255 chars', () => {
      test('it is a valid schema', () => {
        const result = versionedStringOrStringOrTranslationSchema(6).validate(longStr);

        expect(result.error).not.toBeDefined();
      });
    });

    describe('when I provide an object', () => {
      test('it is not a valid schema', () => {
        const result = versionedStringOrStringOrTranslationSchema(6).validate(normalObj);

        expect(result.error).toBeDefined();
        expect(result.error?.details[0].type).toEqual('string.base');
      });
    });
  });
});
