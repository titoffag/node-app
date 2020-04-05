import { createLogger, format, transports } from 'winston';

import { LOG } from '../constants';

const { combine, timestamp, label, printf, colorize } = format;

const formatter = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}] ${message}`;
});

const createFileTransport = (filename: string, level: string) =>
  new transports.File({ dirname: LOG.DIRNAME, filename, level, maxsize: LOG.FILE_MAX_SIZE });

const consoleLogTransport = new transports.Console({
  format: combine(colorize(), timestamp(), formatter),
});
const errorFileTransport = createFileTransport('error.log', 'error');
const warningFileTransport = createFileTransport('warning.log', 'warn');
const infoFileTransport = createFileTransport('info.log', 'info');

export const logger = createLogger({
  exitOnError: false,
  format: combine(timestamp(), formatter),
  transports: [consoleLogTransport, errorFileTransport, warningFileTransport, infoFileTransport],
});
