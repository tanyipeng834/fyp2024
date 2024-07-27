"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const accountsController = __importStar(require("../controllers/accountsController"));
const express_oauth2_jwt_bearer_1 = require("express-oauth2-jwt-bearer");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const router = (0, express_1.Router)();
const checkJwt = (0, express_oauth2_jwt_bearer_1.auth)({
    audience: process.env.AUDIENCE,
    issuerBaseURL: process.env.ISSUERBASEURL,
});
/* CREATE */
router.post('/createlearneraccount', accountsController.createLearnerAccount);
router.post('/createadminaccount', accountsController.createAdminAccount);
/* READ */
router.get('/getallaccounts', checkJwt, accountsController.getAllAccounts);
router.get('/getaccountbyid/:id', accountsController.getAccountById);
router.get('/getalllearneraccounts', accountsController.getAllLearnerAccounts);
router.get('/getalladminaccounts', accountsController.getAllAdminAccounts);
/* UPDATE */
router.patch('/updateaccount', accountsController.updateAccount);
/* DELETE */
router.delete('/deleteaccount/:id', accountsController.deleteAccount);
// Custom error handler middleware
function customErrorHandler(err, req, res, next) {
    if (err && err.status === 401) {
        return res.status(401).json({ message: 'Unauthorized Access' });
    }
    next(err);
}
// Use the custom error handler
router.use(customErrorHandler);
exports.default = router;
