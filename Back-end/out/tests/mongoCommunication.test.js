'use strict';
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, '__esModule', { value: true });
const mongodb_1 = require('mongodb');
const databaseConnection_1 = require('../databaseConnection');
const uri_json_1 = __importDefault(require('../uri.json'));
const databaseTest = 'testing';
const collectionTest = 'testCollection';
const client = new mongodb_1.MongoClient(uri_json_1.default.data);
const user = {
    name: 'Branislav',
    age: 25,
    nick: 'bane',
};
describe('tests the connection to mongo client by adding,getting and deleting an item', () => {
    //
    test('adds name to database and confirms', async () => {
        let result;
        try {
            await client.connect();
            result = await (0, databaseConnection_1.createItem)(
                client,
                user,
                databaseTest,
                collectionTest
            );
        } catch (error) {
            console.log(error);
        } finally {
            await client.close();
            expect(result).toBeTruthy;
        }
    });
    test('gets object from database by name', async () => {
        let result;
        try {
            await client.connect();
            result = await (0, databaseConnection_1.findItemByName)(
                client,
                user.name,
                databaseTest,
                collectionTest
            );
        } catch (error) {
            console.log(error);
        } finally {
            await client.close();
            expect(result.name).toBe(user.name);
        }
    });
    test('tries to get a nonexsistent name', async () => {
        let result;
        try {
            await client.connect();
            result = await (0, databaseConnection_1.findItemByName)(
                client,
                'notavailable',
                databaseTest,
                collectionTest
            );
        } catch (error) {
            console.log(error);
        } finally {
            await client.close();
            expect(result).toBeFalsy;
        }
    });
    test('deletes object by name from database', async () => {
        let result;
        let nameId;
        try {
            await client.connect();
            result = await (0, databaseConnection_1.deleteItemByName)(
                client,
                'Branislav',
                databaseTest,
                collectionTest
            );
            result = await (0, databaseConnection_1.findItemById)(
                client,
                nameId,
                databaseTest,
                collectionTest
            );
        } catch (error) {
            console.log(error);
        } finally {
            await client.close();
            expect(result).toBeFalsy;
        }
    });
});
