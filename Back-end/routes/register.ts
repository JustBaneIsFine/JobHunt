import express from 'express';
import { handleRegister } from '../helperFunctions/registerAndLoginHandlers';
import { validateInput } from '../helperFunctions/inputValidator';
const registerRouter = express.Router();
registerRouter.use(express.json());
registerRouter.use(express.urlencoded({ extended: false }));

registerRouter.post('', validateInput, createUserHandler);

export async function createUserHandler(req, res) {
    const username = req.body['username'];
    const password = req.body['password'];
    const email = req.body['email'];
    const handled = await handleRegister(username, email, password);
    if (handled != false) {
        req.session.user = handled;
        res.status(200);
        res.json({ success: true });
    } else {
        res.status(200);
        res.json({ success: false, error: 'username is taken' });
    }
}
export default registerRouter;
