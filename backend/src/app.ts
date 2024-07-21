import express from 'express';
import cors from 'cors';
import accountsRouter from './route/accountsRouter';
import session from "express-session";
import RedisStore from "connect-redis";

import { createClient } from 'redis'; 

const redisClient = createClient({
    url: 'redis://redis:6379' // Use the Docker container name as hostname

});
(async () => {
    // Connect to redis server
    await redisClient.connect();
})();


redisClient.on('error', function (err:Error) {
    console.log('Could not establish a connection with redis. ' + err);
});

redisClient.on('connect', function () {
    console.log('Connected to redis successfully');
});


//Configure redis client


const app = express();
app.use(cors());
const port = 3000;

app.use(accountsRouter);
app.use(session({
    store: new RedisStore({ client: redisClient }),
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 60000, httpOnly:true } // Adjust secure and maxAge as needed
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
