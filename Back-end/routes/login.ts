import express from 'express';
const loginRouter = express.Router();

/* GET home page. */
loginRouter.get('', function (req, res, next) {
    res.send('it works man!!!!');
    res.render('index', { title: 'Express' });
});
loginRouter.post('');

export default loginRouter;
