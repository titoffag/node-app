import { STATUS_CODE } from '../constants';

import { logger } from './logger';

export function httpTryCatch(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = async function(...args: any) {
    try {
      return await originalMethod.apply(this, args);
    } catch (error) {
      switch (error.status) {
        case STATUS_CODE.NOT_FOUND:
          return this.notFound();
        case STATUS_CODE.BAD_REQUEST:
          return this.badRequest(error.message);
        default:
          logger.error(`Something went wrong: ${error.message}`);

          return this.internalServerError(error);
      }
    }
  };

  return descriptor;
}
