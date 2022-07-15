import { replaceLinks } from '../src/commons/link-replacer';

const DUMMY_ENV_HASHID = 'dummy-env-hashid';

const a = (link: string, text: string) => `<a href="#/e/${DUMMY_ENV_HASHID}/${link}">${text}</a>`;

describe('link replacement', () => {
  describe('given the text input matches no link', () => {
    test('then nothing is replaced', () => {
      // arrange
      const input = 'The device has not been online for more than 3 days and has missed 2 consecutive condition reports.';

      // act
      const replaced = replaceLinks(DUMMY_ENV_HASHID, input);

      // assert
      expect(replaced).toEqual(input);
    });
  });

  describe('given the text matches a link reference', () => {
    describe('then the link is replaced with an anchor tag', () => {
      test.each([
        // issues
        ['issue #eyr9dr', a('issues/eyr9dr', 'issue #eyr9dr')],
        [' issue #eyr9dr ', ` ${a('issues/eyr9dr', 'issue #eyr9dr')} `],
        ['Issue #eyr9dr', a('issues/eyr9dr', 'issue #eyr9dr')],
        [' Issue #eyr9dr ', ` ${a('issues/eyr9dr', 'issue #eyr9dr')} `],

        // reports
        ['report #eyr9dr', a('reports/eyr9dr', 'report #eyr9dr')],
        ['Report #eyr9dr', a('reports/eyr9dr', 'report #eyr9dr')],
        [
          'condition report #eyr9dr',
          `condition ${a('reports/eyr9dr', 'report #eyr9dr')}`,
        ],
        ['rapport #eyr9dr', a('reports/eyr9dr', 'rapport #eyr9dr')],
        ['meetrapport #eyr9dr', a('reports/eyr9dr', 'meetrapport #eyr9dr')],

        // commands
        ['command #eyr9dr', a('commands/eyr9dr', 'command #eyr9dr')],
        ['Command #eyr9dr', a('commands/eyr9dr', 'command #eyr9dr')],
        ['opdracht #eyr9dr', a('commands/eyr9dr', 'opdracht #eyr9dr')],
      ])('(%s) -> (%s)', (input, expected) => {
        // act
        const replaced = replaceLinks(DUMMY_ENV_HASHID, input);

        // assert
        expect(replaced).toEqual(expected);
      });
    });
  });
});
