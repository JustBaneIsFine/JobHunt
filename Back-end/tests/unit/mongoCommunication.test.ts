import { MongoClient } from 'mongodb';
import {
    createItem,
    deleteItemByName,
    findItemByName,
    findItemById,
} from '../../databaseConnection';
import uri from '../../uri.json';
const databaseTest = 'testing';
const collectionTest = 'testCollection';
const client = new MongoClient(uri.data);

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
            result = await createItem(client, user);
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
            result = await findItemByName(client, user.name);
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
            result = await findItemByName(client, 'notavailable');
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
            result = await deleteItemByName(client, 'Branislav');

            result = await findItemById(client, nameId);
        } catch (error) {
            console.log(error);
        } finally {
            await client.close();
            expect(result).toBeFalsy;
        }
    });
});
