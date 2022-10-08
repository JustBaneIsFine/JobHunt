import express from 'express';
const registerRouter = express.Router();

/* GET home page. */
registerRouter.get('', function (req, res, next) {
    res.send('it works man!!!!');
    res.render('index', { title: 'Express' });
});

export default registerRouter;
