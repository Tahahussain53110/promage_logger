import 'dotenv/config';
import 'newrelic'

import express, { urlencoded, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { AppDataSource } from './data-source';
import logger from './config/logger';
import { Routes } from './routes';
import { requestLogger } from './middlewares';
import { runMigrations } from './utils/run-migrations';
import { initializeWebSocket } from './sockets/websockets';


AppDataSource.initialize()
  .then(async () => {
    console.log('Database connected', process.env.DATABASE);
  })
  .then(async () => {
    const app = express();
    app.use(cors());
    app.use(bodyParser.json({ limit: '100mb' }));
    app.use(urlencoded({ extended: false }));
    app.use(requestLogger);

    Routes.forEach((route) => {
      (app as any)[route.method](
        route.route,
        route.middlewares,
        async (req: Request, res: Response, next: Function) => {
          try {
            const result = new (route.controller as any)()[route.action](
              req,
              res,
              next,
            );
            if (result instanceof Promise) {
              await result.then((result) =>
                result !== null && result !== undefined
                  ? res.send(result)
                  : undefined,
              );
            } else if (result !== null && result !== undefined) {
              res.json(result);
            }
          } catch (error) {
            next(error);
          }
        },
      );
    });

    app.get('/', (request: Request, response: Response) => {
      response.send('health check');
    });
    app.listen(process.env.PORT);
    runMigrations();
    logger.info(`Express server has started on port ${process.env.PORT}`);
  })
  .catch((error) => logger.error(error));
