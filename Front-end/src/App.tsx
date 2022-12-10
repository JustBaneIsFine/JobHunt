import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import NavigationBar from './components/navigationBar';
import User from './pages/user';
import {
  checkAndUpdateState,
  checkAndUpdateCategoriesState,
  updateJobTags,
  updateLocations,
} from './ts/stateHandler';
import CreateJob from './pages/createJob';
function App() {
  const [userState, setUserState] = useState({ loggedIn: false, username: '' });
  const passableState = {
    userState: userState,
    setState: setUserState,
    checkState: () => {
      checkAndUpdateState(setUserState);
    },
  };
  const [categoriesState, setCategoriesState] = useState<string | object[]>('loading');
  const [currentCategoryTag, setCurrentCategoryTag] = useState<string>('all');
  const [searchTags, setSearchTags] = useState<string[]>(['']);
  const [jobTags, setJobTags] = useState<string[] | string>('none');
  const [locations, setLocations] = useState<string[] | string>('none');

  useEffect(() => {
    async function updateInitialStates() {
      await checkAndUpdateState(setUserState);
      await checkAndUpdateCategoriesState(setCategoriesState);
      await updateJobTags(setJobTags);
      await updateLocations(setLocations);
    }

    updateInitialStates();
  }, []);

  return (
    <div className='App'>
      <BrowserRouter>
        <NavigationBar state={passableState} />
        <Routes>
          <Route
            path='/'
            element={<Home state={passableState} categoryState={categoriesState} />}
          />
          <Route path='/user' element={<User state={passableState} />} />
          {/* <Route path='/user'>
            <Route index element={<User />} />
            <Route path=':userId' element={<User />} />
            <Route path=':userSettings' element={<User />} />
          </Route>
          <Route path='/jobs' element={<Home />} />
          <Route path='/categories' element={<Home />} />
          <Route path='/admin' element={<Home />} /> */}
          <Route
            path='/createJob'
            element={<CreateJob locationState={locations} jobTagState={jobTags} />}
          />
          <Route path='/login' element={<Login state={passableState} />} />
          <Route path='/register' element={<Register state={passableState} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
