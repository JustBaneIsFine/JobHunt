import React from 'react';
import { render, screen } from '@testing-library/react';
import Register from '../../pages/register';

describe('Registration form works', () => {
  describe('new user, registration succeeds', async () => {
    //registration should succeed meaning the username is not used already..
    test('server responded with 200 everything works', () => {
      // const o = 5;
    });
  });

  describe('username taken and registration fails works', async () => {
    //username is already taken, registration should fail
    test('username is taken', () => {
      // const o = 5;
    });
  });

  describe('invalid input test', async () => {
    //invalid input, registration should fail before even sending to server
    test('password does not match', () => {
      // const o = 5;
    });
    test('username is too short', () => {
      // const o = 5;
    });
    test('password is too short', () => {
      // const o = 5;
    });
  });
});
