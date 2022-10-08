import { MongoClient } from 'mongodb';
import uri from './uri.json';

export async function main() {
    const client = new MongoClient(uri.data);

    try {
        await client.connect();
        await listDatabases(client);
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

export async function createItem(client, newItem: object, database, coll) {
    const result = await client
        .db(database)
        .collection(coll)
        .insertOne(newItem);
    return result.insertedId;
}

async function createMultipleItems(client, newItems: object) {
    const result = await client
        .db('sample_mflix')
        .collection('comments')
        .insertMany(newItems);

    //console.log(`${result.insertedCount} new listings created with ids:`);
}

export async function findItemByName(
    client,
    nameOfItem: string,
    database,
    coll
) {
    const result = await client
        .db(database)
        .collection(coll)
        .findOne({ name: nameOfItem });

    return result;
}

async function updateItemByName(client, nameOfItem, updatedItem) {
    const result = await client
        .db('sample_mflix')
        .collection('comments')
        .updateOne({ name: nameOfItem }, { $set: updatedItem });

    const item = await findItemByName(
        client,
        nameOfItem,
        'sample_mflix',
        'comments'
    );

    // console.log(result.matchedCount, 'matched the query stuff');
    // console.log(result.modifiedCount, 'have been updated');
}

export async function deleteItemByName(client, nameOfItem, database, coll) {
    const itemId = await findItemByName(client, nameOfItem, database, coll);

    await client.db(database).collection(coll).deleteOne({ _id: itemId._id });
    return await findItemByName(client, nameOfItem, database, coll);
}

export async function findItemById(client, itemId, database, coll) {
    const item = await client
        .db(database)
        .collection(coll)
        .findOne({ _id: itemId });
}
//main().catch(console.log);
