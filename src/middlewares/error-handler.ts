import { ErrorRequestHandler, Request, Response, NextFunction } from 'express';
import createError from 'http-errors';
import { STATUS_CODE } from '../constants';

export const errorHandler: ErrorRequestHandler = (
  error: any,
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  // todo: add logger from winston package
  // logger.error('Something went wrong', { error });
  console.log('here');

  response.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ errorMessage: 'Something went wrong' });
};
