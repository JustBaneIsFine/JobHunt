import express from 'express';
import { validateInput } from '../helperFunctions/inputValidator';
import { usernameExists } from '../databaseConnection';
import { passMatches } from '../helperFunctions/hashing';
const loginRouter = express.Router();

loginRouter.post('', validateInput, loginHandler);

export async function loginHandler(req, res) {
    const username = req.body['username'];
    const password = req.body['password'];
    const userData = await usernameExists(username);

    if (userData != null) {
        const passDoesMatch = await passMatches(password, userData['password']);
        if (passDoesMatch) {
            //login approved
            res.status(200);
            res.json({ success: true });
        } else {
            res.status(200);
            res.json({
                success: false,
                error: 'username/password combination is wrong',
            });
        }
    } else if (userData === null) {
        res.status(200);
        res.json({
            success: false,
            error: 'username/password combination is wrong',
        });
    }
}

export default loginRouter;
