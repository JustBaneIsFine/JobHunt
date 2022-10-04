'use strict';
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, '__esModule', { value: true });
const mongodb_1 = require('mongodb');
const uri_json_1 = __importDefault(require('./uri.json'));
async function main() {
    const client = new mongodb_1.MongoClient(uri_json_1.default.data);
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
//main().catch(console.log);
