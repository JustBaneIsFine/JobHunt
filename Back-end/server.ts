import express from 'express';
import session from 'express-session';
import path from 'path';
import cookieParser from 'cookie-parser';
import indexRouter from './routes/index';
import usersRouter from './routes/users';
import registerRouter from './routes/register';
import loginRouter from './routes/login';
import logoutRouter from './routes/logout';
import cors from 'cors';
import MongoStore from 'connect-mongo';
import uri from './uri.json';
import deleteUserRouter from './routes/deleteUser';
import categoriesRouter from './routes/categories';
const allowedOrigins = ['http://localhost:3001'];
const options: cors.CorsOptions = {
    origin: allowedOrigins,
    credentials: true,
};

const app = express();
const port = 3000;

app.use(cors(options));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(
    session({
        key: 'cookie id',
        secret: 'secret',
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 1000 * 60 * 60 * 24,
        },
        store: MongoStore.create({
            mongoUrl: uri.data,
            dbName: 'sessions',
            collectionName: 'sessionsTest',
        }),
    })
);
app.use('/index', indexRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/deleteUser', deleteUserRouter);
app.use('/categories', categoriesRouter);

app.get('/', (req, res) => {
    res.send('hello world AGAIN!');
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

export function testFunc(a: number, b: number) {
    return a + b;
}
