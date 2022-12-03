import { validationErrorObject } from './interfaces/validation';

export function validateInput(
  name: string,
  email: string,
  pass: string,
  errorObject: validationErrorObject,
) {
  const nameResult = checkLengthUsername(name);
  const passResult = checkLengthPass(pass);
  const emailResult = checkEmail(email);
  let valid = true;
  if (nameResult != true) {
    errorObject.usernameError = nameResult.error;
    valid = false;
  }
  if (passResult != true) {
    errorObject.passwordError = passResult.error;
    valid = false;
  }
  if (emailResult != true) {
    errorObject.emailError = emailResult.error;
    valid = false;
  }

  return valid;
}

function checkLengthPass(pass: string) {
  if (pass.length < 8) {
    return { error: 'password is too short' };
  } else if (pass.length > 25) {
    return { error: 'password is too long' };
  } else {
    return true;
  }
}
function checkLengthUsername(name: string) {
  if (name.length < 3) {
    return { error: 'username is too short' };
  } else if (name.length > 20) {
    return { error: 'username is too long' };
  } else {
    return true;
  }
}

function checkEmail(email: string) {
  const emailKindaLooksGood = email.match(/^\S+@\S+\.\S+$/);
  return emailKindaLooksGood != null ? true : { error: 'wrong email format' };
}
