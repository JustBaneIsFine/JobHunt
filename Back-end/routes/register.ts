import express from 'express';
import { handleRegister } from '../helperFunctions/registerAndLoginHandlers';
import { validateInput } from '../helperFunctions/inputValidator';
const registerRouter = express.Router();
registerRouter.use(express.json());
registerRouter.use(express.urlencoded({ extended: false }));

/* GET home page. */
registerRouter.post('', validateInput, createUserHandler);

export async function createUserHandler(req, res) {
    const username = req.body['name'];
    const password = req.body['password'];

    const handled = await handleRegister(username, password);
    if (!handled) {
        res.status(201);
        res.send('This username is already taken');
    } else {
        res.status(200);
        res.send('You are now registered');
    }
}
export default registerRouter;
