import { schema as fileToServer } from '../src/models/file-to-server';

const schema = fileToServer
  .options({ presence: 'required' }) // Makes the inner fields required.
  .required();

describe('interpretation of joi library documentation', () => {
  describe('given a presence required option ', () => {
    test('then the keys inside are required', () => {
      // arrange
      const invalidInput = { dataUrl: 'someURLInStringForm' };
      const validInput = { dataUrl: 'someURLInStringForm', name: 'filename.txt' };

      // act
      const validationResultInvalid = schema.validate(invalidInput);
      const validationResultValid = schema.validate(validInput);

      // assert
      expect(validationResultInvalid.error).not.toEqual(undefined);
      expect(validationResultValid.error).toEqual(undefined);
    });
  });
});
