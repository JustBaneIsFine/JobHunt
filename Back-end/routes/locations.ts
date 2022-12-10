import express from 'express';
const locationsRouter = express.Router();

/* GET home page. */
locationsRouter.get('', handleLocations);

async function handleLocations() {
    // fetch tags from database
    // send tags to front-end
}

export default locationsRouter;
