import React from 'react';
import { Link } from 'react-router-dom';
import { requestUserDeletion } from '../ts/communication';
const User = (props: { state }) => {
  return (
    <div>
      <h1> Welcome to the user page</h1>
      <Link to='/'>Click here to go back to the Home page</Link>
      <Link to='/home' onClick={deleteUser}>
        Delete user: {props.state.userState.username}
      </Link>
    </div>
  );

  async function deleteUser() {
    await requestUserDeletion();
    props.state.checkState();
  }
};

export default User;
