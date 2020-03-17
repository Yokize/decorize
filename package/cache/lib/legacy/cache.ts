import pick from 'lodash/pick';
import isNil from 'lodash/isNil';
import isFunction from 'lodash/isFunction';
import isPlainObject from 'lodash/isPlainObject';
import { createSetter } from '@decorize/core/accessor/createSetter';
import { hasOwnProperty } from '@decorize/core/reflect/hasOwnProperty';
import { isOriginallyMethod } from '@decorize/core/original/isOriginallyMethod';
import { methodLegacyDecorator } from '@decorize/core/legacy/methodLegacyDecorator';
import { accessorLegacyDecorator } from '@decorize/core/legacy/accessorLegacyDecorator';
import { getDecoratorId, CacheConfig, CacheEntry, checkExpiration, throwIncorrectUsage } from '../cache';
import { Global } from '../global';

/**
 * Decorate the method to cache its result.
 *
 * @param target Class (prototype).
 * @param property Method name.
 * @param descriptor Method descriptor.
 * @param configuration Configuration.
 * @return Descriptor with cache logic.
 */
function decorateMethod(
  target: object,
  property: PropertyKey,
  descriptor: PropertyDescriptor,
  configuration?: CacheConfig
): PropertyDescriptor {
  // Attributes used to create new behaviour.
  const { get, set, value }: PropertyDescriptor = descriptor;

  // New descriptor with predefined cache logic.
  const newDescriptor: PropertyDescriptor = pick(descriptor, ['configurable', 'enumerable']);

  // Create new setter or use from an existing descriptor.
  newDescriptor.set = isFunction(get) || isFunction(set) ? set : createSetter(property);

  // Create new getter which generate function with cache logic.
  newDescriptor.get = function cacheGetter(this: object): Function {
    // Function whose result has to be cached.
    const fn: Function = get?.call(this) ?? value;

    // Verify that the function is the correct type.
    if (!isFunction(fn)) throwIncorrectUsage();

    // Return the original function in case its accessed from the prototype.
    if (hasOwnProperty(this, 'constructor')) return fn;

    // Create new method with cache logic.
    return function cacheLogic(this: object, ...args: any[]): any {
      // Execute without cache in case the context is nil.
      if (isNil(this)) return fn.apply(this, args);

      // Generate the key which used to store and access the result.
      const cacheKey: PropertyKey = (configuration?.resolver ?? Global.resolver)(...args);

      // Need to check cache expiration.
      checkExpiration(this, property, cacheKey, configuration);

      // Determine whether the result is already in the cache.
      if (!Global.has(this, property, cacheKey)) {
        // Cache entry with the result.
        const cacheEntry: CacheEntry = {
          value: fn.apply(this, args),
          maxAge: configuration?.maxAge,
          timestamp: Date.now()
        };

        //  Cache the result of the method.
        Global.set(this, property, cacheKey, cacheEntry);
      }

      // Retrieve the cached result.
      return Global.get(this, property, cacheKey).value;
    };
  };

  // Return new descriptor with cache logic.
  return newDescriptor;
}

/**
 * Decorate the getter to cache its result.
 *
 * @param target Class (prototype).
 * @param property Property name.
 * @param descriptor Property descriptor.
 * @param configuration Configuration.
 * @return Descriptor with cache logic.
 */
function decorateGetter(
  target: object,
  property: PropertyKey,
  descriptor: PropertyDescriptor,
  configuration?: CacheConfig
): PropertyDescriptor {
  // Attributes used to create new behaviour.
  const { get, set }: PropertyDescriptor = descriptor;

  // New descriptor with predefined cache logic.
  const newDescriptor: PropertyDescriptor = pick(descriptor, ['configurable', 'enumerable']);

  // Use setter from an existing descriptor.
  newDescriptor.set = set;

  // Create new getter to cache its result.
  newDescriptor.get = function cacheLogic(this: object): any {
    // Execute without cache in case its accessed from the prototype.
    if (hasOwnProperty(this, 'constructor')) return get.call(this);

    // Generate the key which used to store and access the result.
    const cacheKey: PropertyKey = (configuration?.resolver ?? Global.resolver)();

    // Need to check cache expiration.
    checkExpiration(this, property, cacheKey, configuration);

    // Determine whether the result is already in the cache.
    if (!Global.has(this, property, cacheKey)) {
      // Cache entry with the result.
      const cacheEntry: CacheEntry = {
        value: get.call(this),
        maxAge: configuration?.maxAge,
        timestamp: Date.now()
      };

      // Cache the result of the getter.
      Global.set(this, property, cacheKey, cacheEntry);
    }

    // Retrieve the cached result.
    return Global.get(this, property, cacheKey).value;
  };

  // Return new descriptor with cache logic.
  return newDescriptor;
}

/**
 * Universal decorator (without type checking).
 */
function decorateUniversal(args: any[]): any {
  if (args.length === 0)
    // Decorator is used as the factory.
    return (...args2: any[]): any => decorateUniversal(args2);

  if (args.length === 1)
    // Decorator is applied with config.
    return (...args2: any[]): any => decorateUniversal([...args2, ...args]);

  // Destructuring of dynamic arguments.
  const [target, property, descriptor, configuration] = args;

  // Verify that the decorator is used correctly.
  if (!isPlainObject(descriptor)) throwIncorrectUsage();

  // Create new decorator based on the property (method / getter).
  const newlyCreatedDecorator: any =
    isFunction(descriptor.value) || isOriginallyMethod(target, property)
      ? methodLegacyDecorator(getDecoratorId(), decorateMethod, configuration)
      : isFunction(descriptor.get)
      ? accessorLegacyDecorator(getDecoratorId(), decorateGetter, configuration)
      : throwIncorrectUsage();

  // Execute newly created decorator.
  return newlyCreatedDecorator(target, property, descriptor);
}

/**
 * Cache the result of the method or getter.
 *
 * @param config Configuration.
 * @return Method or getter decorator.
 */
export function Cache(config?: CacheConfig): MethodDecorator;

/**
 * Cache the result of the method or getter.
 *
 * @param target Class (prototype).
 * @param property Property name.
 * @param descriptor Property Descriptor.
 * @return Descriptor with cache logic.
 */
export function Cache(target: object, property: PropertyKey, descriptor: PropertyDescriptor): PropertyDescriptor;
export function Cache(...args: any[]): any {
  return decorateUniversal.call(null, args);
}

/**
 * Cache the result of the method or getter.
 *
 * @param config Configuration.
 * @return Method or getter decorator.
 */
export function cache(config?: CacheConfig): MethodDecorator;

/**
 * Cache the result of the method or getter.
 *
 * @param target Class (prototype).
 * @param property Property name.
 * @param descriptor Property Descriptor.
 * @return Descriptor with cache logic.
 */
export function cache(target: object, property: PropertyKey, descriptor: PropertyDescriptor): PropertyDescriptor;
export function cache(...args: any[]): any {
  return decorateUniversal.call(null, args);
}
