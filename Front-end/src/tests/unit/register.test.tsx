import React from 'react';
import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import Register from '../../pages/register';
import * as validate from '../../js/inputValidation';
import { server } from '../../mocks/server';
import { rest } from 'msw';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../../pages/home';
afterEach(() => {
  jest.clearAllMocks();
  jest.restoreAllMocks();
});

describe('Registration form works', () => {
  describe('front-end register input check', () => {
    test('password is too short', async () => {
      await inputData('usernameIsGood', 'pasBad');
      expect(screen.getByPlaceholderText('password is too short')).toBeInTheDocument();
    });

    test('password is too long', async () => {
      await inputData('usernameIsGood', 'passwordIsWaaaaaaaaaaaaayTooooooooLooooooooong');
      expect(screen.getByPlaceholderText('password is too long')).toBeInTheDocument();
    });

    test('username is too short', async () => {
      await inputData('hi', 'PasswordIsPrettyGood');
      expect(screen.getByPlaceholderText('username is too short')).toBeInTheDocument();
    });

    test('username is too long', async () => {
      await inputData(
        'Hi,MyNameIsWHO,MyNameIsWhat,MyNameIsChka-ChkaSlimShady',
        'PasswordIsPrettyGood',
      );
      expect(screen.getByPlaceholderText('username is too long')).toBeInTheDocument();
    });
  });
  describe('back-end register input check', () => {
    //-------If for some reason someone manages to pass trough the front-end checks
    //-------And makes it to the back, we want to handle that as well..
    test('password is too short', async () => {
      // here we expect the result of the fetch to return an error
      server.use(
        rest.post('/register', (req, res, ctx) => {
          return res(ctx.status(200), ctx.json({ success: false, error: 'password is too short' }));
        }),
      );
      jest.spyOn(validate, 'validateInput').mockReturnValue(true);
      await inputData('testUsernameWorks', 'pass');
      const isThere = await screen.findByPlaceholderText('password is too short');
      expect(isThere).toBeInTheDocument();
    });
    test('username is too short', async () => {
      server.use(
        rest.post('/register', (req, res, ctx) => {
          return res(ctx.status(200), ctx.json({ success: false, error: 'username is too short' }));
        }),
      );

      jest.spyOn(validate, 'validateInput').mockReturnValue(true);
      await inputData('hi', 'passisGoood');
      const isThere = await screen.findByPlaceholderText('username is too short');
      expect(isThere).toBeInTheDocument();
    });
    test('password is too long', async () => {
      server.use(
        rest.post('/register', (req, res, ctx) => {
          return res(ctx.status(200), ctx.json({ success: false, error: 'password is too long' }));
        }),
      );

      jest.spyOn(validate, 'validateInput').mockReturnValue(true);
      await inputData('UsernameGood', 'passwordIsWaaaaaaaaaaaaaaayTooooooooooLooooooooong');
      const isThere = await screen.findByPlaceholderText('password is too long');
      expect(isThere).toBeInTheDocument();
    });
    test('username is too long', async () => {
      server.use(
        rest.post('/register', (req, res, ctx) => {
          return res(ctx.status(200), ctx.json({ success: false, error: 'username is too long' }));
        }),
      );

      jest.spyOn(validate, 'validateInput').mockReturnValue(true);
      await inputData('UsernameIsWaaaaaaaaaaaaaaaaaayTooooooooooLooooooooong', 'passIsGoodTho');
      const isThere = await screen.findByPlaceholderText('username is too long');
      expect(isThere).toBeInTheDocument();
    });
    test('username is taken', async () => {
      server.use(
        rest.post('/register', (req, res, ctx) => {
          return res(ctx.status(200), ctx.json({ success: false, error: 'username is taken' }));
        }),
      );

      await inputData('busyName', 'passCantBeBusyCanIt');
      const isThere = await screen.findByPlaceholderText('username is taken');
      expect(isThere).toBeInTheDocument();
    });
  });

  describe('new user, registration succeeds', () => {
    test('server responded with 200 everything works', async () => {
      await inputData('UsernameIsGood', 'PasswordIsGood');
      const homeIsThere = await screen.findByText('This is homepage');
      expect(homeIsThere).toBeInTheDocument();
    });
    //registration should succeed meaning the username is not used already..
  });
});

async function inputData(name, pass) {
  user.setup();
  window.history.pushState({}, '', '/register');
  render(
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/home' element={<Home />} />
      </Routes>
    </BrowserRouter>,
  );
  const inputName = screen.getByTestId('inputUser');
  const inputPass = screen.getByTestId('inputPass');
  const submitButton = screen.getByRole('button', { name: /click here to register/i });
  await user.click(inputName);
  await user.paste(name);
  await user.click(inputPass);
  await user.paste(pass);
  await user.click(submitButton);
}
