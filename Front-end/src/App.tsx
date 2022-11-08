import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import NavigationBar from './components/navigationBar';
import { checkAndUpdateState } from './ts/stateHandler';

function App() {
  const [userState, setUserState] = useState({ loggedIn: false, username: '' });
  const passableState = {
    userState: userState,
    setState: setUserState,
    checkState: () => {
      checkAndUpdateState(setUserState);
    },
  };

  return (
    <div className='App'>
      <BrowserRouter>
        <NavigationBar state={passableState} />
        <Routes>
          <Route path='/' element={<Home state={passableState} />} />
          <Route path='/home' element={<Home state={passableState} />} />
          {/* <Route path='/user'>
            <Route index element={<User />} />
            <Route path=':userId' element={<User />} />
            <Route path=':userSettings' element={<User />} />
          </Route>
          <Route path='/jobs' element={<Home />} />
          <Route path='/categories' element={<Home />} />
          <Route path='/admin' element={<Home />} /> */}
          <Route path='/login' element={<Login state={passableState} />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
