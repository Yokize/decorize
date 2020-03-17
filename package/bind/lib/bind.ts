import { defineMetadata } from '@decorize/core/reflect/defineMetadata';
import { getOwnMetadata } from '@decorize/core/reflect/getOwnMetadata';
import { hasOwnMetadata } from '@decorize/core/reflect/hasOwnMetadata';

/**
 * Get unique identifier of the decorator.
 */
export function getDecoratorId(): string {
  return 'decorize:@bind';
}

/**
 * Determine whether the bound method is cached.
 *
 * @param target Class (prototype).
 * @param property Method name.
 * @return True in case the method is cached; false otherwise.
 */
export function hasBoundMethod(target: object, property: PropertyKey): boolean {
  return hasOwnMetadata(getDecoratorId(), target, property);
}

/**
 * Set the bound method to the cache.
 *
 * @param target Class (prototype).
 * @param property Method name.
 * @param boundFn Bound method.
 */
export function setBoundMethod(target: object, property: PropertyKey, boundFn: Function): void {
  defineMetadata(getDecoratorId(), { boundFn }, target, property);
}

/**
 * Get the bound method from the cache.
 *
 * @param target Class (prototype).
 * @param property Method name.
 * @return Bound method.
 */
export function getBoundMethod(target: object, property: PropertyKey): Function {
  return getOwnMetadata(getDecoratorId(), target, property).boundFn;
}

/**
 * Throw error in case the decorator used incorrectly.
 */
export function throwIncorrectUsage(): never {
  throw new Error(`${getDecoratorId()} must be applied to the class or method`);
}
