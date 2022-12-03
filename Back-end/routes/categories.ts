import express from 'express';
import { getCategories } from '../helperFunctions/mongoComm/categories';
const categoriesRouter = express.Router();

/* GET home page. */
categoriesRouter.get('', handleCategoryResponse);

async function handleCategoryResponse(req, res) {
    const result = await getCategories();
    if (result != undefined || result != null) {
        console.log(result);
        res.json({ success: true, categories: result.categories });
    } else {
        res.json({ success: false });
    }
}
export default categoriesRouter;
