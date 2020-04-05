import { Request, Response } from 'express';

import { STATUS_CODE } from '../constants';

import { logger } from './logger';

export function methodNotAllowed(request: Request, response: Response): Response {
    const {
      route: { methods, path },
      method,
    } = request;

    const allowedMethods =
      Object.keys(methods)
        .filter(method => method !== '_all')
        .map(key => key.toUpperCase())
        .join(', ') || 'GET, POST, PUT, DELETE';

    const message = `Unsupported method ${method} applied at ${path}. Allowed methods: ${allowedMethods}`;
    logger.error(message);

    return response.header('Allow', allowedMethods).sendStatus(STATUS_CODE.METHOD_NOT_ALLOWED);
}