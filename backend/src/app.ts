import express from 'express';
import cors from 'cors';
import accountsRouter from './route/accountsRouter';

const app = express();
app.use(cors());
const port = 3000;

app.use(accountsRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});