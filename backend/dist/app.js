"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const accountsRouter_1 = __importDefault(require("./route/accountsRouter"));
const express_session_1 = __importDefault(require("express-session"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const redis_1 = require("redis");
const redisClient = (0, redis_1.createClient)({
    url: 'redis://localhost:6379' // Use the Docker container name as hostname
});
redisClient.on('error', function (err) {
    console.log('Could not establish a connection with redis. ' + err);
});
redisClient.on('connect', function () {
    console.log('Connected to redis successfully');
});
//Configure redis client
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const port = 3000;
app.use(accountsRouter_1.default);
app.use((0, express_session_1.default)({
    store: new connect_redis_1.default({ client: redisClient }),
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 60000 } // Adjust secure and maxAge as needed
}));
app.get('/set-session', (req, res) => {
    req.session.userSession = 'Redis session test';
    res.send('Session value set.');
});
app.get('/get-session', (req, res) => {
    const sessionValue = req.session.userSession;
    res.send(`Session value: ${sessionValue}`);
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
