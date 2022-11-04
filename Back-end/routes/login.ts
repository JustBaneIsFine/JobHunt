import express from 'express';
import { validateInput } from '../helperFunctions/inputValidator';
import { handleLogin } from '../helperFunctions/registerAndLoginHandlers';
const loginRouter = express.Router();

loginRouter.post('', validateInput, loginHandler);
export async function loginHandler(req, res) {
    const username = req.body['username'];
    const password = req.body['password'];
    const handled = await handleLogin(username, password);

    if (handled != false) {
        if (handled.passGood === true) {
            req.session.user = handled.user;
            res.status(200);
            res.json({ success: true });
        } else {
            res.status(200);
            res.json({
                success: false,
                error: 'username/password combination is wrong',
            });
        }
    } else {
        res.status(200);
        res.json({
            success: false,
            error: 'username/password combination is wrong',
        });
    }
}

loginRouter.get('', loginCheck);

export async function loginCheck(req, res) {
    if (req.session.user) {
        res.status(200);
        res.json({ loggedIn: true, user: req.session.user });
    } else {
        res.status(200);
        res.json({ loggedIn: false });
    }
}
export default loginRouter;
