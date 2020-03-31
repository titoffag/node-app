import { STATUS_CODE } from '../constants';

import { logger } from './logger';

export function httpTryCatch(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = async function(...args: any) {
    try {
      return await originalMethod.apply(this, args);
    } catch (error) {
      const [, response] = args;
      logger.error('Something went wrong', { error });

      response.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ errorMessage: 'Something went wrong' });
    }
  };

  return descriptor;
}
