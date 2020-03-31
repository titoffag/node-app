import { createLogger, format, transports } from 'winston';

const LOG_DIRNAME = 'logs';
const LOG_FILE_MAX_SIZE = 5000;

// prettyPrint
const { combine, timestamp, label, printf, colorize } = format;

const formatter = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}] ${message}`;
});

const createFileTransport = (filename: string, level: string) =>
  new transports.File({ dirname: LOG_DIRNAME, filename, level, maxsize: LOG_FILE_MAX_SIZE });

const consoleLogTransport = new transports.Console({
  format: combine(colorize(), timestamp(), formatter),
  handleExceptions: true,
  // ???
});
const errorFileTransport = createFileTransport('error.log', 'error');
const warningFileTransport = createFileTransport('warning.log', 'warn');
const infoFileTransport = createFileTransport('info.log', 'info');

export const logger = createLogger({
  exitOnError: false,
  format: combine(timestamp(), formatter),
  transports: [consoleLogTransport, errorFileTransport, warningFileTransport, infoFileTransport],
});
