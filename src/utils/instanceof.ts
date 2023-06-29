export function isPromise<T>(it: T | PromiseLike<T>): it is PromiseLike<T> {
  return it instanceof Promise || typeof (it as any)?.then === 'function';
}
export const isString = (val: unknown): val is string => typeof val === 'string';
export const isNumber = (val: unknown): val is string => typeof val === 'number';
export const isFunction = (val: unknown): val is string => typeof val === 'function';
export const isArray = (val: unknown): val is any[] => typeof val === 'object';
