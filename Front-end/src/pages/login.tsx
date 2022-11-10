import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { submitLogin } from '../ts/loginHandlers';
import { returnError } from '../ts/returnError';
//what other components are needed in this page

const Login = (props: { state }) => {
  const navigate = useNavigate();
  const passwordRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState({ usernameError: '', passwordError: '' });

  return (
    <div>
      <h1>This is the login page</h1>
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
      const loginResult = await submitLogin(usernameRef.current.value, passwordRef.current.value);
      if (loginResult.success === true) {
        props.state.checkState();
        return navigate('/home');
      } else {
        usernameRef.current.value = '';
        passwordRef.current.value = '';

        setErrors({
          usernameError: returnError(loginResult, 'username'),
          passwordError: returnError(loginResult, 'password'),
        });
      }
    }
  }
};

export default Login;
