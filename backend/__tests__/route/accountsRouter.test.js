const request = require("supertest");
const express = require("express");
const accountsRouter = require("../../src/route/accountsRouter").default;
const { getAllAccounts } = require("../../src/accountsdb");

const app = express();
app.use(accountsRouter);

jest.mock("../../src/accountsdb", () => ({
    getAllAccounts: jest.fn(),
}));

beforeEach(() => {
    jest.clearAllMocks();
});

describe("GET All Accounts", () => {
    const accounts = [
        {
            userid: 1,
            firstname: "Mary",
            lastname: "Brown",
            email: "mary.brown@example.com",
            role: "admin",
            age: "Millennials (25-40)",
            gender: "Female",
            datecreated: "2024-07-13T16:11:18.442052+00:00",
        },
        {
            userid: 2,
            firstname: "Mary",
            lastname: "Brown",
            email: "mary.brown@example.com",
            role: "admin",
            age: "Millennials (25-40)",
            gender: "Female",
            datecreated: "2024-07-13T16:11:18.442052+00:00",
        },
    ];

    it("should return an 200 status code and all accounts", async () => {
        getAllAccounts.mockResolvedValue(accounts);

        const res = await request(app).get("/getallaccounts");

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(accounts);
    });

    it("should return a 500 status code when there is an error", async () => {
        getAllAccounts.mockResolvedValue(null);

        const res = await request(app).get("/getallaccounts");

        expect(res.statusCode).toBe(500);
        expect(res.body).toEqual({ error: "Failed to retrieve accounts" });
    });
});
