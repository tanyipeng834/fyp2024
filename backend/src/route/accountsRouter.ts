import express from 'express';
import { getAllAccounts } from '../accountsdb';

const accountsRouter = express.Router();

accountsRouter.get('/getallaccounts', async (req, res) => {

    const accounts = await getAllAccounts();
    res.status(200);
    res.json(accounts);

});

export default accountsRouter;