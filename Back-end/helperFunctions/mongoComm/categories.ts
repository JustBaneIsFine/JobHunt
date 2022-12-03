import { mainComm } from './general';
const categoryDatabase = 'Categories';
const categoryCollection = 'Categories';

//This is a single category that will be inside the categories object
interface singleCategory {
    name: string;
    subCategory: Array<object>;
}

export async function updateCategory(oldCategory, newCategory) {
    //
}
export async function getCategories() {
    return await mainComm(getCategoriesFunc);
}
export async function getTags() {
    //
}
export async function updateTags() {
    //
}
async function getCategoriesFunc(client) {
    const result = await client
        .db(categoryDatabase)
        .collection(categoryCollection)
        .findOne({ name: 'categories' });
    return result;
}
async function updateCategoryFunc() {
    //
}
async function getTagsFunc() {
    //
}
async function updateTagsFunc() {
    //
}
