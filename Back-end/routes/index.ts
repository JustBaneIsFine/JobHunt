import express from 'express';
const indexRouter = express.Router();

/* GET home page. */
indexRouter.get('', function (req, res, next) {
    res.send('it works man!!!!');
    res.render('index', { title: 'Express' });
});

export default indexRouter;
