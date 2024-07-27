import { Router } from 'express';
import * as accountsController from '../controllers/accountsController';
import { auth } from 'express-oauth2-jwt-bearer';
import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";

dotenv.config();

const router = Router();

const checkJwt = auth({
    audience: process.env.AUDIENCE!,
    issuerBaseURL: process.env.ISSUERBASEURL!,
});

/* CREATE */
router.post('/createlearneraccount', accountsController.createLearnerAccount);
router.post('/createadminaccount', accountsController.createAdminAccount);

/* READ */
router.get('/getallaccounts', checkJwt, accountsController.getAllAccounts);
router.get("/getaccountbyid/:id", checkJwt, accountsController.getAccountById);
router.get('/getalllearneraccounts', checkJwt, accountsController.getAllLearnerAccounts);
router.get('/getalladminaccounts', checkJwt, accountsController.getAllAdminAccounts);

/* UPDATE */
router.patch("/updateaccount", checkJwt, accountsController.updateAccount);

/* DELETE */
router.delete("/deleteaccount/:id", checkJwt, accountsController.deleteAccount);

// Custom error handler middleware
function customErrorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    if (err && err.status === 401) {
        return res.status(401).json({ message: 'Unauthorized Access' });
    }
    next(err);
}

// Use the custom error handler
router.use(customErrorHandler);

export default router;