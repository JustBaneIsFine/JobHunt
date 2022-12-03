import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Categories from '../components/categories';
const Home = (props: { state; categoryState }) => {
  return (
    <div>
      <h1> This is the homepage, welcome{props.state.userState.username}</h1>
      <Link to='/user'>
        <p>Click here to go to the user page</p>
      </Link>
      <Link to='/login'>
        <p>Click here to go to the login page</p>
      </Link>
      <Link to='/register'>
        <p>Click here to go to the register page</p>
      </Link>

      <aside>
        <Categories categoryState={props.categoryState} />
      </aside>
    </div>
  );
};

export default Home;
