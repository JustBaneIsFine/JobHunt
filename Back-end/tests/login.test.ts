import express from 'express';
import loginRouter from '../routes/login';

const testPasswords = [
    { userName: 'name', password: 'password123' },
    { userName: 'name1', password: 'password1234' },
];

describe('logging in works', () => {
    test('hashing,salting,peppering works', () => {
        //expect(test).toBe(test)
    });
    describe('login successful test works', () => {
        test('username and password match', () => {
            // success
        });
    });

    describe('login failed test works', () => {
        //
        test('wrong password or username', () => {
            //
        });

        test('username does not exsist works', () => {
            // hello
        });
    });
});
