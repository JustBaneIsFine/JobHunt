import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { submitRegister } from '../js/register';

const Register = () => {
  const passwordRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState({ usernameError: '', passwordError: '' });
  // const errors = { username: 'gg', password: '' };
  return (
    <div>
      <h1> This is the register page</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submitCheck();
        }}
      >
        <div>
          <label> Enter your username here</label>
          <input
            data-testid='inputUser'
            type='text'
            ref={usernameRef}
            placeholder={errors.usernameError}
          />
        </div>
        <div>
          <label> Enter your password here</label>
          <input
            data-testid='inputPass'
            type='password'
            ref={passwordRef}
            placeholder={errors.passwordError}
          />
        </div>

        <input type='submit' value={'click here to register'} />
      </form>
    </div>
  );

  async function submitCheck() {
    if (usernameRef.current != null && passwordRef.current != null) {
      const result = await submitRegister(usernameRef.current.value, passwordRef.current.value);

      if (Object.keys(result).includes('response')) {
        usernameRef.current.value = '';
        passwordRef.current.value = '';
        //testing
        setErrors({ usernameError: 'hello', passwordError: '' });
      } else {
        usernameRef.current.value = '';
        passwordRef.current.value = '';

        setErrors({
          usernameError: returnError(result, 'username'),
          passwordError: returnError(result, 'password'),
        });
      }
    }
  }

  function returnError(response, type) {
    if (Object.keys(response).includes(`${type}Error`)) {
      return response[`${type}Error`];
    } else if (
      Object.keys(response).includes('errorCode') &&
      response['error'].includes(`${type}`)
    ) {
      return response['error'];
    } else {
      return '';
    }
    // We want to check first if we have errors on the front end..
    // If there are errors, we assign them..
    // If not, we check the back-end for errors
    //
  }
};
export default Register;
