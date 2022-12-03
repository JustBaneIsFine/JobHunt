import React from 'react';
import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import * as validate from '../../ts/inputValidation';
import { server } from '../../mocks/server';
import { rest } from 'msw';

import App from '../../App';
afterEach(() => {
  jest.clearAllMocks();
  jest.restoreAllMocks();
});

describe('Registration form works', () => {
  describe('front-end register input check', () => {
    test('password is too short', async () => {
      await inputData('usernameIsGood', 'x@x.x', 'pasBad');
      expect(screen.getByPlaceholderText('password is too short')).toBeInTheDocument();
    });

    test('password is too long', async () => {
      await inputData('usernameIsGood', 'x@x.x', 'passwordIsWaaaaaaaaaaaaayTooooooooLooooooooong');
      expect(screen.getByPlaceholderText('password is too long')).toBeInTheDocument();
    });

    test('username is too short', async () => {
      await inputData('hi', 'x@x.x', 'PasswordIsPrettyGood');
      expect(screen.getByPlaceholderText('username is too short')).toBeInTheDocument();
    });

    test('username is too long', async () => {
      await inputData(
        'Hi,MyNameIsWHO,MyNameIsWhat,MyNameIsChka-ChkaSlimShady',
        'x@x.x',
        'PasswordIsPrettyGood',
      );
      expect(screen.getByPlaceholderText('username is too long')).toBeInTheDocument();
    });
  });
  describe('back-end register input check', () => {
    test('password is too short', async () => {
      server.use(
        rest.post('/register', (req, res, ctx) => {
          return res(ctx.status(200), ctx.json({ success: false, error: 'password is too short' }));
        }),
      );
      jest.spyOn(validate, 'validateInput').mockReturnValue(true);
      await inputData('testUsernameWorks', 'x@x.x', 'pass');
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
      await inputData('hi', 'x@x.x', 'passisGoood');
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
      await inputData(
        'UsernameGood',
        'x@x.x',
        'passwordIsWaaaaaaaaaaaaaaayTooooooooooLooooooooong',
      );
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
      await inputData(
        'UsernameIsWaaaaaaaaaaaaaaaaaayTooooooooooLooooooooong',
        'x@x.x',
        'passIsGoodTho',
      );
      const isThere = await screen.findByPlaceholderText('username is too long');
      expect(isThere).toBeInTheDocument();
    });
    test('username is taken', async () => {
      server.use(
        rest.post('/register', (req, res, ctx) => {
          return res(ctx.status(200), ctx.json({ success: false, error: 'username is taken' }));
        }),
      );

      await inputData('busyName', 'x@x.x', 'passCantBeBusyCanIt');
      const isThere = await screen.findByPlaceholderText('username is taken');
      expect(isThere).toBeInTheDocument();
    });
  });

  describe('new user, registration succeeds', () => {
    test('server responded with 200 everything works', async () => {
      await inputData('UsernameIsGood', 'x@x.x', 'PasswordIsGood');
      const homeIsThere = await screen.findByText(/usernameIsGood/i);
      expect(homeIsThere).toBeInTheDocument();
    });
  });
});

async function inputData(name, email, pass) {
  user.setup();
  window.history.pushState({}, '', '/register');
  render(<App />);
  const inputName = screen.getByTestId('inputUser');
  const inputPass = screen.getByTestId('inputPass');
  const inputEmail = screen.getByTestId('inputEmail');
  const submitButton = screen.getByRole('button', { name: /click here to register/i });
  await user.click(inputName);
  await user.paste(name);
  await user.click(inputEmail);
  await user.paste(email);
  await user.click(inputPass);
  await user.paste(pass);
  await user.click(submitButton);
}
