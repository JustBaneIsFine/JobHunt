import express from 'express';
const jobTagsRouter = express.Router();

/* GET home page. */
jobTagsRouter.get('', handleJobTags);

async function handleJobTags() {
    // fetch tags from database
    // send tags to front-end
}

export default jobTagsRouter;
