import { getTranslatedString, StringOrTranslations } from '../src/models/string-or-translations';

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
