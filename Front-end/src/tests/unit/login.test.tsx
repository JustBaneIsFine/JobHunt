import React from 'react';
import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';

import * as validate from '../../ts/inputValidation';
import { server } from '../../mocks/server';
import { rest } from 'msw';

import App from '../../App';
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
      await inputData('usernameIsGood', 'x@x.x', '0000');
      const isThere = await screen.findByPlaceholderText('password is too short');
      expect(isThere).toBeInTheDocument();
    });

    test('password is too long', async () => {
      await inputData(
        'usernameIsGood',
        'x@x.x',
        '11111111111111111111111111111111111111111111111111111111111',
      );
      const isThere = await screen.findByPlaceholderText('password is too long');
      expect(isThere).toBeInTheDocument();
    });

    test('username is too short', async () => {
      await inputData('xx', 'x@x.x', 'PasswordIsGood');
      const isThere = await screen.findByPlaceholderText('username is too short');
      expect(isThere).toBeInTheDocument();
    });

    test('username is too long', async () => {
      await inputData(
        'usernameIsWayTooLong11111111111111111111111111111111111111111111',
        'x@x.x',
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
        await inputData('sh', 'x@x.x', 'passwordIsGood');
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
        await inputData('usernameIsGood', 'x@x.x', '0000');
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
        await inputData('usernameIsWayTooLong11111111111111111111111111111111', 'x@x.x', '0000');
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
        await inputData(
          'usernameIsGood',
          'x@x.x',
          'passwordIsWayTooLong111111111111111111111111111',
        );
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
        await inputData('usernameIsGood', 'x@x.x', 'passwordIsGood');
        const isThere = await screen.findAllByPlaceholderText(
          'username/password combination is wrong',
        );

        expect(isThere.length).toBeGreaterThanOrEqual(1);
      });
    });
  });
  test('login successful', async () => {
    //
    await inputData('usernameIsGood', 'x@x.x', 'passwordIsGood');
    const isThere = await screen.findByText(/usernameIsGood/i);
    expect(isThere).toBeInTheDocument();
  });
});

async function inputData(name, email, pass) {
  user.setup();
  window.history.pushState({}, '', '/login');
  render(
    // <BrowserRouter>
    //   <Routes>
    //     <Route path='/login' element={<Login />} />
    //     <Route path='/home' element={<Home />} />
    //   </Routes>
    // </BrowserRouter>,
    <App />,
  );
  const inputName = screen.getByTestId('inputUser');
  const inputPass = screen.getByTestId('inputPass');
  const inputEmail = screen.getByTestId('inputEmail');
  const submitButton = screen.getByRole('button', { name: /click here to login/i });
  await user.click(inputName);
  await user.paste(name);
  await user.click(inputEmail);
  await user.paste(email);
  await user.click(inputPass);
  await user.paste(pass);
  await user.click(submitButton);
}
