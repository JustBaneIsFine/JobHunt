import express from 'express';
const logoutRouter = express.Router();

logoutRouter.get('', logOut);

export async function logOut(req, res) {
    if (req.session.user) {
        req.session.destroy();
        res.status(200);
        res.json({ loggedIn: false });
    } else {
        res.status(400);
        res.send();
    }
}
export default logoutRouter;
