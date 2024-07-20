import express from 'express';
import { getAllAccounts } from '../accountsdb';

const accountsRouter = express.Router();

accountsRouter.get('/getallaccounts', async (req, res) => {

    const accounts = await getAllAccounts();

    if (accounts) {
        res.status(200)
        res.json(accounts);
    } else {
        res.status(500)
        res.json({ error: "Failed to retrieve accounts" });
    }

});

export default accountsRouter;