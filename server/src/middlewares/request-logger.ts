import { Request } from 'express';
import morgan, { StreamOptions } from 'morgan';

import logger from '../config/logger';

const stream: StreamOptions = {
  write: (message) => {
    logger.http(message);
  },
};

const sensitiveFields = ['password'];

morgan.token('body', function (req: Request, res) {
  const filteredBody = { ...req.query, ...req.body };
  sensitiveFields.forEach((field) => {
    if (filteredBody[field]) {
      filteredBody[field] = '[filtered]';
    }
  });
  return Object.keys(filteredBody).length > 0
    ? JSON.stringify(filteredBody, null, 2).substring(0, 256000)
    : '';
});

export const requestLogger = morgan(
  ':method :url :status :res[content-length] :response-time ms\n:body ',
  { stream },
);
