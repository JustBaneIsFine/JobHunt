import { validateInput } from '../../js/inputValidation';

const errorObject = { usernameError: '', passwordError: '', error: '' };

describe('input validation works', () => {
  //
  afterEach(() => {
    errorObject.usernameError = '';
    errorObject.passwordError = '';
    errorObject.error = '';
  });
  test('username too short', () => {
    const result = validateInput('hi', 'somePassword', errorObject);
    expect(errorObject.usernameError).toBe('username is too short');
    expect(result).toBe(false);
  });
  test('username too long', () => {
    const result = validateInput(
      'HiMyNameIs,What?MyNameIs,WhoMyNameIs,Chka-chka,SlimShady',
      'whatsUpWitHim',
      errorObject,
    );
    expect(errorObject.usernameError).toBe('username is too long');
    expect(result).toBe(false);
  });
  test('password too short', () => {
    const result = validateInput('MyNameIsGood', 'PasBad', errorObject);
    expect(errorObject.passwordError).toBe('password is too short');
    expect(result).toBe(false);
  });
  test('password too long', () => {
    const result = validateInput(
      'MyNameIsGood',
      'MyPasswordOnTheOtherHandIsKindaTooLongButWhoCares',
      errorObject,
    );
    expect(errorObject.passwordError).toBe('password is too long');
    expect(result).toBe(false);
  });
});
