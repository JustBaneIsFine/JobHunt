import { validateInput } from './inputValidation';
import { requestLoginCheck, sendRequest, requestLogOut } from './communication';

export async function submitLogin(username, email, password) {
  {
    const errors = { usernameError: '', emailError: '', passwordError: '' };
    const nameTrimmed = username.trim();
    const emailTrimmed = email.trim();
    const passTrimmed = password.trim();
    const inputIsValid = validateInput(nameTrimmed, emailTrimmed, passTrimmed, errors);
    if (inputIsValid) {
      const data = { username: nameTrimmed, email: emailTrimmed, password: passTrimmed };
      const result = await sendRequest('/login', 'post', data);
      return result;
    } else {
      return errors;
    }
  }
}

export async function checkLogin() {
  const loggedIn = await requestLoginCheck();

  if (loggedIn != false) {
    return loggedIn;
  } else {
    return false;
  }
}

export async function logOut() {
  return await requestLogOut();
}
