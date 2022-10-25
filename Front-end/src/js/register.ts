import { validateInput } from './inputValidation';
import { sendRequest } from './communication';

export async function submitRegister(username, password) {
  {
    const errors = { usernameError: '', passwordError: '' };
    const nameTrimed = username.trim();
    const passTrimed = password.trim();
    const inputIsValid = validateInput(nameTrimed, passTrimed, errors);
    if (inputIsValid) {
      const data = { username: nameTrimed, password: passTrimed };
      const result = await sendRequest('/register', 'post', data);
      return result;
    } else {
      return errors;
    }
  }
}
