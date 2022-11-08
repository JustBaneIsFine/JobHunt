import React from 'react';
import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import Login from '../../pages/login';
import Home from '../../pages/home';
import * as validate from '../../ts/inputValidation';
import { server } from '../../mocks/server';
import { rest } from 'msw';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import * as loginHelpers from '../../ts/login';
//backend does not interest you, only what we can control here
//so mock what back-end sends you if there is a need
afterEach(() => {
  jest.clearAllMocks();
  jest.restoreAllMocks();
});
describe('Login form works', () => {
  describe('front-end login input checks', () => {
    //
    test('password is too short', async () => {
      await inputData('usernameIsGood', '0000');
      const isThere = await screen.findByPlaceholderText('password is too short');
      expect(isThere).toBeInTheDocument();
    });

    test('password is too long', async () => {
      await inputData(
        'usernameIsGood',
        '11111111111111111111111111111111111111111111111111111111111',
      );
      const isThere = await screen.findByPlaceholderText('password is too long');
      expect(isThere).toBeInTheDocument();
    });

    test('username is too short', async () => {
      await inputData('xx', 'PasswordIsGood');
      const isThere = await screen.findByPlaceholderText('username is too short');
      expect(isThere).toBeInTheDocument();
    });

    test('username is too long', async () => {
      await inputData(
        'usernameIsWayTooLong11111111111111111111111111111111111111111111',
        'passIsGood',
      );
      const isThere = await screen.findByPlaceholderText('username is too long');
      expect(isThere).toBeInTheDocument();
    });
  });
  describe('back-end responds with errors', () => {
    describe('bad input format', () => {
      test('username is too short', async () => {
        server.use(
          rest.post('/login', (req, res, ctx) => {
            return res(
              ctx.status(200),
              ctx.json({ success: false, error: 'username is too short' }),
            );
          }),
        );

        jest.spyOn(validate, 'validateInput').mockReturnValue(true);
        await inputData('sh', 'passwordIsGood');
        const isThere = await screen.findByPlaceholderText('username is too short');
        expect(isThere).toBeInTheDocument();
      });
      test('password is too short', async () => {
        server.use(
          rest.post('/login', (req, res, ctx) => {
            return res(
              ctx.status(200),
              ctx.json({ success: false, error: 'password is too short' }),
            );
          }),
        );

        jest.spyOn(validate, 'validateInput').mockReturnValue(true);
        await inputData('usernameIsGood', '0000');
        const isThere = await screen.findByPlaceholderText('password is too short');
        expect(isThere).toBeInTheDocument();
      });
      test('username is too long', async () => {
        server.use(
          rest.post('/login', (req, res, ctx) => {
            return res(
              ctx.status(200),
              ctx.json({ success: false, error: 'username is too long' }),
            );
          }),
        );

        jest.spyOn(validate, 'validateInput').mockReturnValue(true);
        await inputData('usernameIsWayTooLong11111111111111111111111111111111', '0000');
        const isThere = await screen.findByPlaceholderText('username is too long');
        expect(isThere).toBeInTheDocument();
      });
      test('password is too long', async () => {
        server.use(
          rest.post('/login', (req, res, ctx) => {
            return res(
              ctx.status(200),
              ctx.json({ success: false, error: 'password is too long' }),
            );
          }),
        );

        jest.spyOn(validate, 'validateInput').mockReturnValue(true);
        await inputData('usernameIsGood', 'passwordIsWayTooLong111111111111111111111111111');
        const isThere = await screen.findByPlaceholderText('password is too long');
        expect(isThere).toBeInTheDocument();
      });
    });
    describe('other errors', () => {
      //
      test('wrong username/password combination', async () => {
        server.use(
          rest.post('/login', (req, res, ctx) => {
            return res(
              ctx.status(200),
              ctx.json({ success: false, error: 'username/password combination is wrong' }),
            );
          }),
        );
        await inputData('usernameIsGood', 'passwordIsGood');
        const isThere = await screen.findAllByPlaceholderText(
          'username/password combination is wrong',
        );

        expect(isThere.length).toBeGreaterThanOrEqual(1);
      });
    });
  });
  test('login successful', async () => {
    //
    await inputData('usernameIsGood', 'passwordIsGood');
    const isThere = await screen.findByText('This is homepage, welcome usernameIsGood');
    expect(isThere).toBeInTheDocument();
  });
});

async function inputData(name, pass) {
  user.setup();
  window.history.pushState({}, '', '/login');
  render(
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={<Home />} />
      </Routes>
    </BrowserRouter>,
  );
  const inputName = screen.getByTestId('inputUser');
  const inputPass = screen.getByTestId('inputPass');
  const submitButton = screen.getByRole('button', { name: /click here to login/i });
  await user.click(inputName);
  await user.paste(name);
  await user.click(inputPass);
  await user.paste(pass);
  await user.click(submitButton);
}
