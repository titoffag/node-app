import { STATUS_CODE } from './constants';

export function isDefined<T>(value: T): boolean {
  return value !== undefined && value !== null;
}

export function httpTryCatch(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = async function(...args: any) {
    try {
      return await originalMethod.apply(this, args);
    } catch (error) {
      const [request, response] = args;

      response.status(STATUS_CODE.BAD_REQUEST).json({ error: error.message });
    }
  };

  return descriptor;
}
