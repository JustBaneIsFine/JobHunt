import { validateInput } from './inputValidation';
import { sendRequest } from './communication';

export async function submitLogin(username, password) {
  {
    const errors = { usernameError: '', passwordError: '' };
    const nameTrimmed = username.trim();
    const passTrimmed = password.trim();
    const inputIsValid = validateInput(nameTrimmed, passTrimmed, errors);
    if (inputIsValid) {
      const data = { username: nameTrimmed, password: passTrimmed };
      const result = await sendRequest('/login', 'post', data);
      return result;
    } else {
      return errors;
    }
  }
}
