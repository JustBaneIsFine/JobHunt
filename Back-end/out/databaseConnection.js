'use strict';
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, '__esModule', { value: true });
exports.findItemById =
    exports.deleteItemByName =
    exports.findItemByName =
    exports.createItem =
    exports.main =
        void 0;
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
exports.main = main;
async function listDatabases(client) {
    const databasesList = await client.db().admin().listDatabases();
    console.log('Databases:');
    databasesList.databases.forEach((db) => {
        console.log(` - ${db.name}`);
    });
}
async function createItem(client, newItem, database, coll) {
    const result = await client
        .db(database)
        .collection(coll)
        .insertOne(newItem);
    return result.insertedId;
}
exports.createItem = createItem;
async function createMultipleItems(client, newItems) {
    const result = await client
        .db('sample_mflix')
        .collection('comments')
        .insertMany(newItems);
    //console.log(`${result.insertedCount} new listings created with ids:`);
}
async function findItemByName(client, nameOfItem, database, coll) {
    const result = await client
        .db(database)
        .collection(coll)
        .findOne({ name: nameOfItem });
    return result;
}
exports.findItemByName = findItemByName;
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
async function deleteItemByName(client, nameOfItem, database, coll) {
    const itemId = await findItemByName(client, nameOfItem, database, coll);
    await client.db(database).collection(coll).deleteOne({ _id: itemId._id });
    return await findItemByName(client, nameOfItem, database, coll);
}
exports.deleteItemByName = deleteItemByName;
async function findItemById(client, itemId, database, coll) {
    const item = await client
        .db(database)
        .collection(coll)
        .findOne({ _id: itemId });
}
exports.findItemById = findItemById;
//main().catch(console.log);
