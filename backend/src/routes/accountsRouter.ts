import { Router } from 'express';
import * as accountsController from '../controllers/accountsController';

const router = Router();

/* CREATE */
router.post('/createlearneraccount', accountsController.createLearnerAccount);
router.post('/createadminaccount', accountsController.createAdminAccount);

/* READ */
router.get('/getallaccounts', accountsController.getAllAccounts);
router.get('/getaccountbyid/:id', accountsController.getAccountById)
router.get('/getalllearneraccounts', accountsController.getAllLearnerAccounts);
router.get('/getalladminaccounts', accountsController.getAllAdminAccounts);

/* UPDATE */
router.patch('/updateaccount', accountsController.updateAccount);

/* DELETE */
router.delete('/deleteaccount/:id', accountsController.deleteAccount);

export default router;