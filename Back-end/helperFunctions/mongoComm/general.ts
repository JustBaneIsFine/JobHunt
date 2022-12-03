import { MongoClient } from 'mongodb';
import uri from '../../uri.json';

const userDatabase = 'testing';
const userCollection = 'testCollection';

export async function mainComm(funcToRun, data?) {
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

export async function createItem(
    database: string,
    collection: string,
    client,
    data: object
) {
    const result = await client
        .db(database)
        .collection(collection)
        .insertOne(data);
    return result.insertedId;
}

async function createMultipleItems(
    database: string,
    collection: string,
    client,
    newItems: object
) {
    const result = await client
        .db(database)
        .collection(collection)
        .insertMany(newItems);

    //console.log(`${result.insertedCount} new listings created with ids:`);
}

export async function findUserById(userId) {
    return await mainComm(findUserId, userId);
}

async function findUserId(client, itemId) {
    const item = await client
        .db(userDatabase)
        .collection(userCollection)
        .findOne({ _id: itemId });
    return item;
}
