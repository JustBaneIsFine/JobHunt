import React from 'react';
import { render, screen } from '@testing-library/react';
import Login from '../../pages/login';

describe('Login form works', () => {
  test('login successful', () => {
    //hello
  });

  test('login failed, Username does not exsist', () => {
    // const o = 5;
    //back nd does not interest you, only what we can control here
    //so mock what back-end sends you if there is a need
  });
  test('login failed, wrong combination username/password', () => {
    // const o = 5;
  });
  test('login failed, no password entered', () => {
    // const o = 5;
  });
});

describe('Login form ui??', () => {
  // seperate UI testing?
});
