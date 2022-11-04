import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { checkLogin } from '../ts/login';
const Home = () => {
  const [userState, setUserState] = useState('');

  useEffect(() => {
    const result = async () => {
      const fetchData = await checkLogin();
      return fetchData;
    };

    result()
      .then((x) => {
        if (x != false) {
          setUserState(x.username);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <div>
      <h1> This is homepage, welcome {userState}</h1>
      <Link to='/user'>
        <p>Click here to go to the user page</p>
      </Link>
      <Link to='/login'>
        <p>Click here to go to the login page</p>
      </Link>
      <Link to='/register'>
        <p>Click here to go to the register page</p>
      </Link>
    </div>
  );
};

export default Home;
