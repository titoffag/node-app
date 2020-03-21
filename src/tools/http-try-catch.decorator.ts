import { STATUS_CODE } from '../constants';

export function httpTryCatch(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = async function(...args: any) {
    try {
      return await originalMethod.apply(this, args);
    } catch (error) {
      const [, response] = args;

      response.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
  };

  return descriptor;
}
