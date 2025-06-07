//src/server.js

import express from 'express';
import  {getEnvVar} from './utils/getEnvVar.js';
import pino from 'pino-http';
import cors from 'cors';
import contactsRouter from './routes/contactsRouter.js';

const PORT = Number(getEnvVar('PORT', '3000'));

export function setupServer() {
    const app = express();
    app.use(express.json());

    app.use(cors());

    app.use(
        pino({
            transport: {
            target: 'pino-pretty',
            },
        }),
    );

    app.use('/contacts', contactsRouter);

    app.use((req, res, next) => {
        res.status(404).json({
             message: 'Not found',
        });
    });


    app.listen(PORT, () => {
        console.log(`Server is running on ${PORT}`);
    });

}