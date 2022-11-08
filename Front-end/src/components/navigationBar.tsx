import React from 'react';
import { Link } from 'react-router-dom';
import { logOut } from '../ts/login';

const NavigationBar = (props: { state }) => {
  const logInButton = <Link to='/login'>Log in</Link>;
  const logOutButton = (
    <Link
      to='/home'
      onClick={async () => {
        await logOut();
        await props.state.checkState();
      }}
    >
      Log out
    </Link>
  );
  const registerButton = <Link to='/register'>Register</Link>;
  const homeLink = <Link to='/home'>Home</Link>;

  return (
    <div>
      {homeLink}
      {props.state.userState.loggedIn ? logOutButton : logInButton}
      {props.state.userState.loggedIn ? null : registerButton}
    </div>
  );
};

export default NavigationBar;
