import { Request, Response, NextFunction } from 'express';

export const logHandler: any = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const params = `params: ${JSON.stringify(request.params)}`;
  const body = `body: ${JSON.stringify(request.body)}`;
  const query = `query: ${JSON.stringify(request.query)}`;
  const url = `url: ${request.url}`;
  const method = `method: ${request.method}`;

  try {
    const start: number = new Date().getTime();
    let executionTime: string;
    request.on('close', () => {
      executionTime = `execution time: ${new Date().getTime() - start} mls`;
      logger.info(`${method} ${url} ${params} ${query} ${body} ${executionTime}`)
    });
  } catch (err) {
    logger.error(err);
  }

  next();
};
