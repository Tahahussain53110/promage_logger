import winston from 'winston';
import winstonEnricher from '@newrelic/winston-enricher';
import { __prod__ } from '../utils/constants';

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'blue',
};

const newrelicFormatter = winstonEnricher(winston);

winston.addColors(colors);

const formatter = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.splat(),
  winston.format.printf(
    ({ timestamp, level, message, ...meta }) =>
      `${timestamp} [${level}]: ${message} ${
        Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ''
      }`,
  ),
);

const transports = [
  new winston.transports.File({
    filename: 'logs/error.log',
    level: 'error',
    format: formatter,
  }),
  new winston.transports.File({
    filename: 'logs/combined.log',
    level: 'debug',
    format: formatter,
  }),
  new winston.transports.Console({
    format: winston.format.combine(winston.format.colorize(), formatter),
  }),
];

const prodTransport = [
  new winston.transports.Console({
    format: newrelicFormatter(),
  }),
];

const logger = winston.createLogger({
  level: __prod__ ? 'http' : 'debug',
  transports: __prod__ ? prodTransport : transports,
  levels: levels,
});

export default logger;
