import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { submitRegister } from '../ts/registerHandlers';
import { returnError } from '../ts/returnError';
const Register = (props: { state }) => {
  const navigate = useNavigate();
  const passwordRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState({ usernameError: '', emailError: '', passwordError: '' });
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
          <label> Enter your email here</label>
          <input
            data-testid='inputEmail'
            type='text'
            ref={emailRef}
            placeholder={errors.emailError}
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
    if (usernameRef.current != null && passwordRef.current != null && emailRef.current != null) {
      const result = await submitRegister(
        usernameRef.current.value,
        emailRef.current.value,
        passwordRef.current.value,
      );

      if (result.success === true) {
        props.state.checkState();
        return navigate('/');
      } else {
        usernameRef.current.value = '';
        passwordRef.current.value = '';
        emailRef.current.value = '';
        const usernameErrorResult = returnError(result, 'username');
        const passwordErrorResult = returnError(result, 'password');
        const emailErrorResult = returnError(result, 'email');
        setErrors({
          usernameError: usernameErrorResult,
          passwordError: passwordErrorResult,
          emailError: emailErrorResult,
        });
      }
    }
  }
};

export default Register;
