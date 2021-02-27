import { Request, Response, NextFunction } from 'express';

import { logger, isEmpty } from '../tools';

export const logHandler = (request: Request, response: Response, next: NextFunction) => {
  const params = !isEmpty(request.params) ? ` params: ${JSON.stringify(request.params)}` : '';
  const query = !isEmpty(request.query) ? ` query: ${JSON.stringify(request.query)}` : '';
  const body = !isEmpty(request.body) ? ` body: ${JSON.stringify(request.body)}` : '';
  const url = `url: ${request.url}`;
  const method = `method: ${request.method}`;

  const start = new Date().getTime();
  request.on('close', () => {
    const executionTime = `execution time: ${new Date().getTime() - start} ms`;
    logger.info(`${method} ${url}${params}${query}${body} ${executionTime}`);
  });

  next();
};
