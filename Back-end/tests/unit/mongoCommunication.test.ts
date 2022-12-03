import { MongoClient, ObjectId } from 'mongodb';
import {
    deleteByUsername,
    usernameExists,
    createNewUser,
} from '../../helperFunctions/mongoComm/users';
import { findUserById } from '../../helperFunctions/mongoComm/general';
import uri from '../../uri.json';
import { createDefaultUserObject } from '../../helperFunctions/userFunctions/defaultUserCreation';

const client = new MongoClient(uri.data);

const user = createDefaultUserObject(
    'John',
    'johndoe@gmail.com',
    'johnDoesPassword'
);
describe('tests the connection to mongo client by adding,getting and deleting an item', () => {
    //
    test('adds name to database and confirms', async () => {
        let result;
        try {
            await client.connect();
            result = await createNewUser(user);
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
            result = await usernameExists(user.username);
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
            result = await usernameExists('unavailable');
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
            const userObject = await usernameExists(user.username);
            const nameIdObject = userObject._id;
            nameId = nameIdObject.toString();
            await deleteByUsername(user.username);
            result = await findUserById(nameId);
        } catch (error) {
            console.log(error);
        } finally {
            await client.close();
            expect(result).toBeFalsy;
        }
    });
});
