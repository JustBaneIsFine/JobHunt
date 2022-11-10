import { MongoClient } from 'mongodb';
import {
    createItem,
    deleteUserByName,
    findItemByName,
    findItemById,
} from '../../databaseConnection';
import uri from '../../uri.json';

const client = new MongoClient(uri.data);

const user = {
    username: 'SomeName',
    age: 25,
    nick: 'NickNick',
    hash: 'gawgawjg092t1gqagwgg3bg2jg=g1',
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
            result = await findItemByName(client, user.username);
        } catch (error) {
            console.log(error);
        } finally {
            await client.close();
            expect(result.username).toBe(user.username);
        }
    });

    test('tries to get a nonexistent name', async () => {
        let result;
        try {
            await client.connect();
            result = await findItemByName(client, 'unavailable');
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
            result = await deleteUserByName('SomeName');

            result = await findItemById(client, nameId);
        } catch (error) {
            console.log(error);
        } finally {
            await client.close();
            expect(result).toBeFalsy;
        }
    });
});
