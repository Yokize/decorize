import isNil from 'lodash/isNil';
import isObject from 'lodash/isObject';
import isFunction from 'lodash/isFunction';
import { isEqualClass } from '@decorize/core/class/isEqualClass';
import { hasOwnProperty } from '@decorize/core/reflect/hasOwnProperty';
import { getPrototypeOf } from '@decorize/core/reflect/getPrototypeOf';
import { toAccessorType } from '@decorize/core/descriptor/toAccessorType';
import { isOriginallyMethod } from '@decorize/core/original/isOriginallyMethod';
import { methodLegacyDecorator } from '@decorize/core/legacy/methodLegacyDecorator';
import { accessorLegacyDecorator } from '@decorize/core/legacy/accessorLegacyDecorator';
import { CacheConfig, checkExpiration, throwUsageError, uniqueId } from '../cache';
import { CacheEntry, Global } from '../global';

/**
 * Decorate the method to cache its result.
 *
 * @param target Class (prototype).
 * @param property Method name.
 * @param descriptor Method descriptor.
 * @param configuration Configuration.
 * @return The descriptor with the cache logic.
 * @ignore
 */
function methodDecoratorLogic(
  target: object,
  property: PropertyKey,
  descriptor: PropertyDescriptor,
  configuration?: CacheConfig
): PropertyDescriptor {
  // Create the new accessor descriptor based on the existing `descriptor`
  // with respect to already assigned attributes.
  const { get, ...newDescriptor }: any = toAccessorType(property, descriptor);

  // Create the new getter with enhanced logic to wrap the original method
  // and cache its results on the fly.
  newDescriptor.get = function cacheGetter(this: object): Function {
    // The function whose result has to be cached can be obtained from the
    // accessor descriptor by executing `get` with context.
    const fn: Function = get.call(this);

    // Ensure the result obtained from `get` is the correct type.
    if (!isFunction(fn)) throwUsageError();

    // In case the `constructor` property directly belongs to the context,
    // it is reasonable to conclude that the context is the prototype and
    // not the class or its instance.
    if (!this || hasOwnProperty(this, 'constructor'))
      // Returns the original function.
      return fn;

    // The ES2015+ specification defines `super` as the reference to the
    // context of the outer method, and there is no need to cache result in
    // case is accessed via `super` to support ES5 compatibility. In case
    // the class (constructor) of the context and the decorator target are
    // different and the context has its own method with same name, it can
    // be concluded that the access to the method was done via `super`.
    if (!isEqualClass(this, target) && hasOwnProperty(getPrototypeOf(this), property))
      // Returns the original function.
      return fn;

    // Create the wrapper with the logic to cache the result of the
    // original method.
    return function cacheLogic(this: object, ...args: any[]): any {
      // Execute without cache in case the context is nil.
      if (isNil(this)) return fn.apply(this, args);

      // Create the key using the global or custom resolver with arguments
      // that are passed to the wrapper.
      const cacheKey: PropertyKey = (configuration?.resolver ?? Global.resolver)(...args);

      // Check expiration of the cache entry.
      checkExpiration(this, property, cacheKey, configuration);

      // Determine whether the entry is missing in the cache.
      if (!Global.has(this, property, cacheKey)) {
        // Entry with the result and additional configs.
        const cacheEntry: CacheEntry = {
          value: fn.apply(this, args),
          maxAge: configuration?.maxAge,
          timestamp: Date.now()
        };

        // Store the entry to the global cache.
        Global.set(this, property, cacheKey, cacheEntry);
      }

      // Retrieve the cached result.
      return Global.get(this, property, cacheKey).value;
    };
  };

  // Returns the descriptor with the cache logic.
  return newDescriptor;
}

/**
 * Decorate the getter to cache its result.
 *
 * @param target Class (prototype).
 * @param property Property name.
 * @param descriptor Property descriptor.
 * @param configuration Configuration.
 * @return The descriptor with the cache logic.
 * @ignore
 */
function getterDecoratorLogic(
  target: object,
  property: PropertyKey,
  descriptor: PropertyDescriptor,
  configuration?: CacheConfig
): PropertyDescriptor {
  // Create the new accessor descriptor based on the existing `descriptor`
  // with respect to already assigned attributes.
  const { get, ...newDescriptor }: any = toAccessorType(property, descriptor);

  // Create the new getter with enhanced logic to wrap the original getter
  // and cache its result on the fly.
  newDescriptor.get = function cacheLogic(this: object): any {
    // In case the `constructor` property directly belongs to the context,
    // it is reasonable to conclude that the context is the prototype and
    // not the class or its instance.
    if (!this || hasOwnProperty(this, 'constructor'))
      // Returns the result of the original getter.
      return get.call(this);

    // The ES2015+ specification defines `super` as the reference to the
    // context of the outer method, and there is no need to cache result in
    // case is accessed via `super` to support ES5 compatibility. In case
    // the class (constructor) of the context and the decorator target are
    // different and the context has its own method with same name, it can
    // be concluded that the access to the method was done via `super`.
    if (!isEqualClass(this, target) && hasOwnProperty(getPrototypeOf(this), property))
      // Returns the result of the original getter.
      return get.call(this);

    // Create the key using the global or custom resolver without arguments.
    const cacheKey: PropertyKey = (configuration?.resolver ?? Global.resolver)();

    // Check expiration of the cache entry.
    checkExpiration(this, property, cacheKey, configuration);

    // Determine whether the entry is missing in the cache.
    if (!Global.has(this, property, cacheKey)) {
      // Entry with the result and additional configs.
      const cacheEntry: CacheEntry = {
        value: get.call(this),
        maxAge: configuration?.maxAge,
        timestamp: Date.now()
      };

      // Store the entry to the global cache.
      Global.set(this, property, cacheKey, cacheEntry);
    }

    // Retrieve the cached result.
    return Global.get(this, property, cacheKey).value;
  };

  // Returns the descriptor with the cache logic.
  return newDescriptor;
}

/**
 * Universal decoration (without type checking).
 *
 * @param args Dynamic arguments.
 * @ignore
 */
function cacheDecorator(args: any[]): any {
  if (args.length === 0)
    // If there are no arguments, the decorator was used as a factory.
    return (...args2: any[]): any => cacheDecorator(args2);

  if (args.length === 1)
    // If there is one argument, the decorator was applied with config.
    return (...args2: any[]): any => cacheDecorator([...args2, ...args]);

  // Destructuring the dynamic arguments.
  const [target, property, descriptor, configuration] = args;

  // Ensure the decorator is used correctly.
  if (!isObject(descriptor)) throwUsageError();

  // If there are three arguments, the decorator was applied to the method or getter.
  const newlyCreatedDecorator: any =
    isFunction((<any>descriptor).value) || isOriginallyMethod(target, property)
      ? methodLegacyDecorator(uniqueId, methodDecoratorLogic, configuration)
      : isFunction((<any>descriptor).get)
      ? accessorLegacyDecorator(uniqueId, getterDecoratorLogic, configuration)
      : throwUsageError();

  // Execute newly created decorator.
  return newlyCreatedDecorator(target, property, descriptor);
}

/**
 * Cache the result of the method or getter.
 *
 * @param config Config.
 * @return Method or getter decorator.
 */
export function Cache(config?: CacheConfig): MethodDecorator;

/**
 * Cache the result of the method or getter.
 *
 * @param target Class (prototype).
 * @param property Property name.
 * @param descriptor Property Descriptor.
 * @return The descriptor with the cache logic.
 */
export function Cache(target: object, property: PropertyKey, descriptor: PropertyDescriptor): PropertyDescriptor;
export function Cache(...args: any[]): any {
  return cacheDecorator.call(null, args);
}

/**
 * Cache the result of the method or getter.
 *
 * @param config Config.
 * @return Method or getter decorator.
 */
export function cache(config?: CacheConfig): MethodDecorator;

/**
 * Cache the result of the method or getter.
 *
 * @param target Class (prototype).
 * @param property Property name.
 * @param descriptor Property Descriptor.
 * @return The descriptor with the cache logic.
 */
export function cache(target: object, property: PropertyKey, descriptor: PropertyDescriptor): PropertyDescriptor;
export function cache(...args: any[]): any {
  return cacheDecorator.call(null, args);
}
