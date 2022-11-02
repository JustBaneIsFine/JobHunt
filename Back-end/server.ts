import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import indexRouter from './routes/index';
import usersRouter from './routes/users';
import registerRouter from './routes/register';
import loginRouter from './routes/login';
import cors from 'cors';
const allowedOrigins = ['http://localhost:3001'];

const options: cors.CorsOptions = {
    origin: allowedOrigins,
};

const app = express();
const port = 3000;
app.use(cors(options));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/index', indexRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);

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
