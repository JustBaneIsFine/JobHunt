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
            res.send();
        } else {
            res.status(201);
            res.json({ error: 'password does not match' });
            res.send();
        }
    } else if (userData === null) {
        res.status(201);
        res.json({ error: "user doesn't exist" });
        res.send();
    }
}

export default loginRouter;
