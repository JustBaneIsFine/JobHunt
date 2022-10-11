import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { submitRegister } from '../js/register';
const passwordRef = useRef<HTMLInputElement>(null);
const usernameRef = useRef<HTMLInputElement>(null);

const Register = () => {
  return (
    <div>
      <h1> This is the register page</h1>
      <form onSubmit={submitCheck}>
        <label> Enter your username here</label>
        <input type='text' ref={usernameRef}></input>
        <label> Enter your password here</label>
        <input type='password' ref={passwordRef}></input>
        <input type='submit'>Click here to register </input>
      </form>
    </div>
  );
};

export default Register;

function submitCheck() {
  if (usernameRef.current != null && passwordRef.current != null) {
    submitRegister(usernameRef.current.value, passwordRef.current.value);
  }
}
