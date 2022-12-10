import { mainComm } from './general';
import { userInterface } from '../../interfaces/userInterface';
const userDatabase = 'testing';
const userCollection = 'testCollection';

export async function deleteByUsername(username) {
    return await mainComm(deleteByUsernameFunc, username);
}
export async function usernameExists(username) {
    return await mainComm(findByUsernameFunc, username);
}
export async function updateByUsername() {
    return await mainComm(updateByUsernameFunc);
}
export async function createNewUser(userObject: userInterface) {
    return await mainComm(createUserFunc, userObject);
}

async function deleteByUsernameFunc(client, data) {
    const itemId = await findByUsernameFunc(client, data);
    await client
        .db(userDatabase)
        .collection(userCollection)
        .deleteOne({ _id: itemId._id });
    return await findByUsernameFunc(client, data);
}
async function updateByUsernameFunc(client, [username, updatedItem]) {
    await client
        .db(userDatabase)
        .collection(userCollection)
        .updateOne({ username: username }, { $set: updatedItem });

    return await findByUsernameFunc(client, username);
}
async function findByUsernameFunc(client, data: string) {
    const result = await client
        .db(userDatabase)
        .collection(userCollection)
        .findOne({ username: data });

    return result;
}
async function createUserFunc(client, data) {
    const result = await client
        .db(userDatabase)
        .collection(userCollection)
        .insertOne(data);

    return result;
}
