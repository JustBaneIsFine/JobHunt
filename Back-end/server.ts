import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import indexRouter from './routes/index';
import usersRouter from './routes/users';

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/index', indexRouter);

app.get('/', (req, res) => {
    res.send('hello world AGAIN!');
});

app.get('/intro', (req, res) => {
    res.send('that works my dude!');
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

export function testFunc(a: number, b: number) {
    return a + b;
}
