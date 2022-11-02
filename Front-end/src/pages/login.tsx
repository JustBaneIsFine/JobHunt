import React, { useRef, useState } from 'react';
import { json, redirect, useNavigate } from 'react-router-dom';
import { submitLogin } from '../js/login';
import { returnError } from '../js/returnError';
//what other components are needed in this page

const Login = () => {
  const navigate = useNavigate();
  const passwordRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState({ usernameError: '', passwordError: '' });

  return (
    <div>
      <h1> This is the login page</h1>
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

        <input type='submit' value={'click here to login'} />
      </form>
    </div>
  );

  async function submitCheck() {
    if (usernameRef.current != null && passwordRef.current != null) {
      const result = await submitLogin(usernameRef.current.value, passwordRef.current.value);
      if (result === true) {
        return navigate('/home');
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
};

export default Login;
