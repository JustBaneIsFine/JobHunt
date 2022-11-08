import React from 'react';
import { Link } from 'react-router-dom';
const User = () => {
  return (
    <div>
      <h1> Welcome to the user page</h1>
      <Link to='/'>Click here to go back to the Home page</Link>
    </div>
  );
};

export default User;
