import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { submitLogin } from '../js/login';
const passwordRef = useRef<HTMLInputElement>(null);
const usernameRef = useRef<HTMLInputElement>(null);

//what other components are needed in this page

const Login = () => {
  return (
    <div>
      <h1> This is the login page</h1>
      <form className='inputDiv' onSubmit={submitCheck}>
        <label> Enter your username here</label>
        <input type='text' ref={usernameRef}></input>
        <label> Enter your password here</label>
        <input type='password' ref={passwordRef}></input>
        <input type='submit' id='submitLogin'>
          Click to login
        </input>
      </form>
    </div>
  );
};

function submitCheck() {
  if (usernameRef.current != null && passwordRef.current != null) {
    submitLogin(usernameRef.current.value, passwordRef.current.value);
  }
}

export default Login;
