import express from 'express';
import registerRouter from '../routes/register';

const testPasswords = [
    { userName: 'name', password: 'password123' },
    { userName: 'name1', password: 'password1234' },
];

describe('registering works', () => {
    test('hashing,salting,peppering works', () => {
        //expect(test).toBe(test)
    });
    describe('register successful test works', () => {
        test('username is not taken', () => {
            //
        });

        test('saving hashed password and username to db works', () => {
            //test is test
        });
    });

    describe('register failed test works', () => {
        //
        test('username is taken', () => {
            //
        });
    });
});
