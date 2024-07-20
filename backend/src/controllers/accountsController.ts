import { Request, Response } from "express";
import * as accountsService from "../services/accountsService";

/* CREATE */

export const createLearnerAccount = async (req: Request, res: Response) => {

    const learner = req.body;

    try {
        const account = await accountsService.createLearnerAccount(learner);
        res.status(201).json({
            "userid": account[0].userid,
            "status": 201,
            "statusText": "Created"
        });
    } catch (error) {
        res.status(500).json({
            error: "Failed to create Learner account",
        });
        console.log(error)
    }
};

export const createAdminAccount = async (req: Request, res: Response) => {

    const admin = req.body;

    try {
        const account = await accountsService.createAdminAccount(admin);
        res.status(201).json({
            "userid": account[0].userid,
            "status": 201,
            "statusText": "Created"
        });
    } catch (error) {
        res.status(500).json({
            error: "Failed to create Admin account",
        });
        console.log(error)
    }
};

/* READ */

export const getAllAccounts = async (req: Request, res: Response) => {
    try {
        const accounts = await accountsService.getAllAccounts();
        res.status(200).json(accounts);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve accounts" });
    }
};

export const getAccountById = async (req: Request, res: Response) => {
    try {
        const account = await accountsService.getAccountById(
            Number(req.params.id)
        );
        res.status(200).json(account);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve account" });
    }
};

export const getAllLearnerAccounts = async (req: Request, res: Response) => {
    try {
        const accounts = await accountsService.getAllLearnerAccounts();
        res.status(200).json(accounts);
    } catch (error) {
        res.status(500).json({
            error: "Failed to retrieve all learner accounts",
        });
    }
};

export const getAllAdminAccounts = async (req: Request, res: Response) => {
    try {
        const accounts = await accountsService.getAllAdminAccounts();
        res.status(200).json(accounts);
    } catch (error) {
        res.status(500).json({
            error: "Failed to retrieve all admin accounts",
        });
    }
};

/* UPDATE */

/* DELETE */

export const deleteAccount = async (req: Request, res: Response) => {

    try {
        const response = await accountsService.deleteAccount(Number(req.params.id));
        res.status(200).json({
            "status": response.status,
            "statusText": response.statusText
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete account" });
    }

}

