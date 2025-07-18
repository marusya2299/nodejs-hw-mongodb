//src/server.js

import express from 'express';
import { getEnvVar } from './utils/getEnvVar.js';
import pino from 'pino-http';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import apiRouter from './routers/index.js';

import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

import { UPLOAD_DIR } from './constants/index.js';
import { swaggerDocs } from './middlewares/swaggerDocs.js';

const PORT = Number(getEnvVar('PORT', '3000'));

export function setupServer() {
    const app = express();
    app.use(express.json());

    app.use(cors());
    app.use(cookieParser());
    app.use('/uploads', express.static(UPLOAD_DIR));
    app.use(
        pino({
            transport: {
            target: 'pino-pretty',
            },
        }),
    );
    
    app.get('/', (req, res) => {
  res.send('API is working! Try /contacts');
});

    app.use('/uploads', express.static(UPLOAD_DIR));
  app.use('/api-docs', swaggerDocs());

    app.use(apiRouter);

    app.use(notFoundHandler);
    app.use(errorHandler);

     app.listen(PORT, () => {
        console.log(`Server is running on ${PORT}`);
    });
}
