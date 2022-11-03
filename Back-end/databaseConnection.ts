import { MongoClient } from 'mongodb';
import uri from './uri.json';
const currentDatabase = 'testing';
const currentCollection = 'testCollection';

interface userObject {
    username: string;
    email: string;
    age: string;
    hash: string;
}

export async function usernameExists(username): Promise<null | userObject> {
    const result = await main(findItemByName, username);
    return result;
}

export async function createNewUser(user: userObject) {
    const result = await main(createItem, user);
    return result;
}

export async function main(funcToRun, data) {
    const client = new MongoClient(uri.data);
    try {
        await client.connect();
        return await funcToRun(client, data);
    } catch (error) {
        console.log(error);
    } finally {
        await client.close();
    }
}

async function listDatabases(client) {
    const databasesList = await client.db().admin().listDatabases();

    console.log('Databases:');
    databasesList.databases.forEach((db) => {
        console.log(` - ${db.name}`);
    });
}

export async function createItem(client, data) {
    const result = await client
        .db(currentDatabase)
        .collection(currentCollection)
        .insertOne(data);
    return result.insertedId;
}

async function createMultipleItems(client, newItems: object) {
    const result = await client
        .db('sample_mflix')
        .collection('comments')
        .insertMany(newItems);

    //console.log(`${result.insertedCount} new listings created with ids:`);
}

export async function findItemByName(client, data: string) {
    const result = await client
        .db(currentDatabase)
        .collection(currentCollection)
        .findOne({ username: data });

    return result;
}

async function updateItemByName(client, nameOfItem, updatedItem) {
    const result = await client
        .db('sample_mflix')
        .collection('comments')
        .updateOne({ name: nameOfItem }, { $set: updatedItem });

    const item = await findItemByName(client, nameOfItem);

    // console.log(result.matchedCount, 'matched the query stuff');
    // console.log(result.modifiedCount, 'have been updated');
}

export async function deleteItemByName(client, data) {
    const itemId = await findItemByName(client, data);

    await client
        .db(currentDatabase)
        .collection(currentCollection)
        .deleteOne({ _id: itemId._id });
    return await findItemByName(client, data);
}

export async function findItemById(client, itemId) {
    const item = await client
        .db(currentDatabase)
        .collection(currentCollection)
        .findOne({ _id: itemId });
    return item;
}
//main().catch(console.log);
