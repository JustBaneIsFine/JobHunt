'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const mongodb_1 = require('mongodb');
async function main() {
    // eslint-disable-next-line prettier/prettier
    const uri = 'mongodb+srv://dbAdminJobHunt:SpecialForcesJudoka997Administrator@jobhunt.hax6hew.mongodb.net/?retryWrites=true&w=majority';
    const client = new mongodb_1.MongoClient(uri);
    try {
        await client.connect();
        await listDatabases(client);
        await updateItemByName(client, 'hello', {
            age: 55,
            how: 'no fing idea',
        });
        // await findItemByName(client, 'hello');
        // await createMultipleItems(client, [
        //     {
        //         name: 'hello',
        //         age: 5,
        //         ethnicity: 'white',
        //     },
        //     {
        //         name: 'hello1',
        //         age: 7,
        //         ethnicity: 'whiter',
        //     },
        //     {
        //         name: 'hello2',
        //         age: 8,
        //         ethnicity: 'whiter2',
        //     },
        // ]);
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
async function createItem(client, newItem) {
    const result = await client
        .db('sample_mflix')
        .collection('comments')
        .insertOne(newItem);
    console.log(`result id is: ${result.insertedId}`);
}
async function createMultipleItems(client, newItems) {
    const result = await client
        .db('sample_mflix')
        .collection('comments')
        .insertMany(newItems);
    console.log(`${result.insertedCount} new listings created with ids:`);
    console.log(result.insertedIds);
}
async function findItemByName(client, nameOfItem) {
    const result = await client
        .db('sample_mflix')
        .collection('comments')
        .findOne({ name: nameOfItem });
    if (result) {
        console.log(`found item ${nameOfItem}`);
        //console.log(result);
    } else {
        console.log(`no item with name ${nameOfItem}`);
    }
    return result;
}
async function updateItemByName(client, nameOfItem, updatedItem) {
    const result = await client
        .db('sample_mflix')
        .collection('comments')
        .updateOne({ name: nameOfItem }, { $set: updatedItem });
    const item = await findItemByName(client, nameOfItem);
    console.log(item);
    console.log(result.matchedCount, 'matched the query stuff');
    console.log(result.modifiedCount, 'have been updated');
    console.log(item, 'AFTER');
}
main().catch(console.log);
