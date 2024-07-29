
const request = require("supertest");
const express = require("express");
const accountsRouter = require("../dist/routes/accountsRouter").default;

const app = express();
app.use(express.json());

const mockAuthMiddleware = (req, res, next) => {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
        const error = new Error("No token provided");
        error.status = 401;
        next(error);
    } else if (authorizationHeader === "Bearer valid_token") {
        next();
    } else {
        const error = new Error("Invalid token");
        error.status = 401;
        next(error);
    }
};

// Mock the checkJwt middleware
app.use(mockAuthMiddleware);
app.use("/accounts", accountsRouter);

// Custom error handler middleware
app.use((err, req, res, next) => {
    if (err.status === 401) {
        return res.status(401).json({ message: "Unauthorized Access" });
    }
    next(err);
});

// Test cases
describe("JWT Authentication Tests", () => {
    it("should allow access with a valid JWT token", async () => {
        const response = await request(app)
            .get("/accounts/getallaccounts")
            .set("Authorization", "Bearer valid_token");

        expect(response.status).not.toBe(401);
        expect(response.status).toBe(200);
    });

    it("should deny access with an invalid JWT token", async () => {
        const response = await request(app)
            .get("/accounts/getallaccounts")
            .set("Authorization", "Bearer invalid_token");

        expect(response.status).toBe(401);
        expect(response.body.message).toBe("Unauthorized Access");
    });

    it("should deny access when no JWT token is provided", async () => {
        const response = await request(app).get("/accounts/getallaccounts");

        expect(response.status).toBe(401);
        expect(response.body.message).toBe("Unauthorized Access");
    });
});
