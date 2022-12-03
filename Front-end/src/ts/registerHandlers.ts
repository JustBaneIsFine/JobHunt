import { validateInput } from './inputValidation';
import { sendRequest } from './communication';

export async function submitRegister(username, email, password) {
  {
    const errors = { usernameError: '', emailError: '', passwordError: '' };
    const nameTrimmed = username.trim();
    const passTrimmed = password.trim();
    const emailTrimmed = email.trim();
    const inputIsValid = validateInput(nameTrimmed, emailTrimmed, passTrimmed, errors);
    if (inputIsValid) {
      const data = { username: nameTrimmed, email: emailTrimmed, password: passTrimmed };
      const result = await sendRequest('/register', 'post', data);

      return result;
    } else {
      return errors;
    }
  }
}
