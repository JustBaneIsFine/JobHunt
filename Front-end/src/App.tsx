import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/home';
import User from './pages/user';
import Login from './pages/login';
import Register from './pages/register';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/user'>
            <Route index element={<User />} />
            <Route path=':userId' element={<User />} />
            <Route path=':userSettings' element={<User />} />
          </Route>
          <Route path='/jobs' element={<Home />} />
          <Route path='/categories' element={<Home />} />
          <Route path='/admin' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

// function sendRequest() {
//   const xhr = new XMLHttpRequest()
//   const url = '/intro'
//   xhr.open('GET', url, true)
//   xhr.setRequestHeader('Content-Type', 'application/json')

//   xhr.onload = function () {
//     console.log(xhr.responseText)
//   }

//   xhr.send('hloi')
// }
// sendRequest()
export default App;
