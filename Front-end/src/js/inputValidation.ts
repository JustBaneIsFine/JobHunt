export function validateInput(name, pass, errorObject) {
  const nameResult = checkLengthUsername(name);
  const passResult = checkLengthPass(pass);
  let valid = true;
  if (nameResult != true) {
    errorObject.usernameError = nameResult.error;
    valid = false;
  }
  if (passResult != true) {
    errorObject.passwordError = passResult.error;
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
