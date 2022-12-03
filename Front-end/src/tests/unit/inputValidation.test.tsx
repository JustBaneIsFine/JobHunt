import { validateInput } from '../../ts/inputValidation';

const errorObject = { usernameError: '', passwordError: '', emailError: '' };

describe('input validation works', () => {
  //
  afterEach(() => {
    errorObject.usernameError = '';
    errorObject.passwordError = '';
    errorObject.emailError = '';
  });
  test('username too short', () => {
    const result = validateInput('hi', 'x@x.x', 'somePassword', errorObject);
    expect(errorObject.usernameError).toBe('username is too short');
    expect(result).toBe(false);
  });
  test('username too long', () => {
    const result = validateInput(
      'HiMyNameIs,What?MyNameIs,WhoMyNameIs,Chka-chka,SlimShady',
      'x@x.x',
      'whatsUpWitHim',
      errorObject,
    );
    expect(errorObject.usernameError).toBe('username is too long');
    expect(result).toBe(false);
  });
  test('password too short', () => {
    const result = validateInput('MyNameIsGood', 'x@x.x', 'PasBad', errorObject);
    expect(errorObject.passwordError).toBe('password is too short');
    expect(result).toBe(false);
  });
  test('password too long', () => {
    const result = validateInput(
      'MyNameIsGood',
      'x@x.x',
      'MyPasswordOnTheOtherHandIsKindaTooLongButWhoCares',
      errorObject,
    );
    expect(errorObject.passwordError).toBe('password is too long');
    expect(result).toBe(false);
  });
});
