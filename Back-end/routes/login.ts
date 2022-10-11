import express from 'express';
const loginRouter = express.Router();

/* GET home page. */
loginRouter
    .route('')
    .get(function (req, res, next) {
        // res.sendFile(__dirname + 'public/js/');
        // res.render('index', { title: 'Express' });
    })
    .post(function (req, res, next) {
        //
    });

export default loginRouter;
