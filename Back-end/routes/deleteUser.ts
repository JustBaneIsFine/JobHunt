import express from 'express';
import session from 'express-session';
import {
    deleteByUsername,
    usernameExists,
} from '../helperFunctions/mongoComm/users';
const deleteUserRouter = express.Router();

deleteUserRouter.post('', deleteUser);

async function deleteUser(req, res) {
    console.log('reqSession', req.session); //WHY IS THIS NULL??
    const idName = req.session.user.username;
    console.log(idName);
    const resultDel = await deleteByUsername(idName);
    const resultFind = await usernameExists(idName);
    console.log('User deleted', resultDel);
    console.log('User Found', resultFind);
    req.session.destroy();
    const response = { resultDel: resultDel, resultFind: resultFind };
    res.json(response);
    //take the session id.
    // delete the session, and also delete the user..
    // find the user trough session id and username somehow..
}
export default deleteUserRouter;
