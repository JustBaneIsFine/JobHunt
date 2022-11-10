import React from 'react';
import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import { server } from '../../mocks/server';
import { rest } from 'msw';
import App from '../../App';

describe('express-sessions work', () => {
  test('session test logging in and out works', async () => {
    //server returns that we are logged out
    serverLoggedIn(false);
    await renderPage();
    const isLoginPage = screen.getByText('This is the login page');
    expect(isLoginPage).toBeInTheDocument();
    //server returns that we are logged in after the input
    serverLoggedIn(true);
    await inputData();
    const isLoggedIn = await screen.findByText(/usernameIsGood/i);

    expect(isLoggedIn).toBeInTheDocument();
    //server returns that we are logged out after we log out below
    serverLoggedIn(false);

    await logOut();
    const loginButton = await screen.findByText('Log in');
    expect(loginButton).toBeInTheDocument();
  });
});

function serverLoggedIn(state) {
  server.use(
    rest.get('/login', (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({ loggedIn: state, user: { password: 'hh', username: 'usernameIsGood' } }),
      );
    }),
  );
}

async function inputData() {
  const nameTest = 'Branislav1234';
  const passTest = 'Branislav1234';

  user.setup();
  const inputName = screen.getByTestId('inputUser');
  const inputPass = screen.getByTestId('inputPass');
  const submitButton = screen.getByRole('button', { name: /click here to login/i });
  await user.click(inputName);
  await user.paste(nameTest);
  await user.click(inputPass);
  await user.paste(passTest);
  await user.click(submitButton);
}

async function renderPage() {
  window.history.pushState({}, '', '/login');
  render(<App />);
}

async function logOut() {
  user.setup();
  const logOutButton = screen.getByRole('link', { name: /log out/i });
  expect(logOutButton).toBeInTheDocument();
  await user.click(logOutButton);

  //
}
