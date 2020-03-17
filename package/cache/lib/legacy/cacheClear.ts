import pick from 'lodash/pick';
import isNil from 'lodash/isNil';
import isFunction from 'lodash/isFunction';
import isPlainObject from 'lodash/isPlainObject';
import { createSetter } from '@decorize/core/accessor/createSetter';
import { hasOwnProperty } from '@decorize/core/reflect/hasOwnProperty';
import { isOriginallyMethod } from '@decorize/core/original/isOriginallyMethod';
import { methodLegacyDecorator } from '@decorize/core/legacy/methodLegacyDecorator';
import { accessorLegacyDecorator } from '@decorize/core/legacy/accessorLegacyDecorator';
import { getDecoratorId, ClearConfig, throwIncorrectUsage } from '../clear';
import { Global } from '../global';

/**
 * Decorate the method to clear the cache on execution.
 *
 * @param target Class (prototype).
 * @param property Method name.
 * @param descriptor Method descriptor.
 * @param configuration Configuration.
 * @return Descriptor with clear logic.
 */
function decorateMethod(
  target: object,
  property: PropertyKey,
  descriptor: PropertyDescriptor,
  configuration?: ClearConfig
): PropertyDescriptor {
  // Attributes used to create new behaviour.
  const { get, set, value }: PropertyDescriptor = descriptor;

  // New descriptor with predefined clear logic.
  const newDescriptor: PropertyDescriptor = pick(descriptor, ['configurable', 'enumerable']);

  // Create new setter or use from an existing descriptor.
  newDescriptor.set = isFunction(get) || isFunction(set) ? set : createSetter(property);

  // Create new getter which generate function with clear logic.
  newDescriptor.get = function clearCacheGetter(this: object): Function {
    // Function that will clear the cache.
    const fn: Function = get?.call(this) ?? value;

    // Verify that the function is the correct type.
    if (!isFunction(fn)) throwIncorrectUsage();

    // Return the original function in case its accessed from the prototype.
    if (hasOwnProperty(this, 'constructor')) return fn;

    // Create new method with clear logic.
    return function clearCacheLogic(this: object, ...args: any[]): any {
      // Execute without clear in case the context is nil.
      if (isNil(this)) return fn.apply(this, args);

      // Clear the cache before executing the function.
      if (configuration?.before) Global.clear(this);

      // Result of the function.
      const result: any = fn.apply(this, args);

      // Clear the cache after executing the function.
      if (configuration?.after || !configuration?.before) Global.clear(this);

      // Return function result.
      return result;
    };
  };

  // Return new descriptor with clear logic.
  return newDescriptor;
}

/**
 * Decorate the getter to clear the cache on execution.
 *
 * @param target Class (prototype).
 * @param property Property name.
 * @param descriptor Property descriptor.
 * @param configuration Configuration.
 * @return Descriptor with clear logic.
 */
function decorateGetter(
  target: object,
  property: PropertyKey,
  descriptor: PropertyDescriptor,
  configuration?: ClearConfig
): PropertyDescriptor {
  // Attributes used to create new behaviour.
  const { get, set }: PropertyDescriptor = descriptor;

  // New descriptor with predefined clear logic.
  const newDescriptor: PropertyDescriptor = pick(descriptor, ['configurable', 'enumerable']);

  // Use setter from an existing descriptor.
  newDescriptor.set = set;

  // Create new getter with clear logic.
  newDescriptor.get = function getterClearCacheLogic(this: object): any {
    // Execute without clear in case its accessed from the prototype.
    if (hasOwnProperty(this, 'constructor')) return get.call(this);

    // Clear the cache before executing the getter.
    if (configuration?.before) Global.clear(this);

    // Result of the getter.
    const result: any = get.call(this);

    // Clear the cache after executing the getter.
    if (configuration?.after || !configuration?.before) Global.clear(this);

    // Return getter result.
    return result;
  };

  // Return new descriptor with clear logic.
  return newDescriptor;
}

/**
 * Decorate the setter to clear the cache on execution.
 *
 * @param target Class (prototype).
 * @param property Property name.
 * @param descriptor Property descriptor.
 * @param configuration Configuration.
 * @return Descriptor with clear logic.
 */
function decorateSetter(
  target: object,
  property: PropertyKey,
  descriptor: PropertyDescriptor,
  configuration?: ClearConfig
): PropertyDescriptor {
  // Attributes used to create new behaviour.
  const { get, set }: PropertyDescriptor = descriptor;

  // New descriptor with predefined clear logic.
  const newDescriptor: PropertyDescriptor = pick(descriptor, ['configurable', 'enumerable']);

  // Use getter from an existing descriptor.
  newDescriptor.get = get;

  // Create new setter with clear logic.
  newDescriptor.set = function setterClearCacheLogic(this: object, ...args: any[]): any {
    // Execute without clear in case its accessed from the prototype.
    if (hasOwnProperty(this, 'constructor')) return set.call(this, ...args);

    // Clear the cache before executing the setter.
    if (configuration?.before) Global.clear(this);

    // Execute the setter.
    set.call(this, ...args);

    // Clear the cache after executing the setter.
    if (configuration?.after || !configuration?.before) Global.clear(this);
  };

  // Return new descriptor with clear logic.
  return newDescriptor;
}

/**
 * Universal decorator (without type checking).
 */
function decorateUniversal(args: any[]): any {
  if (args.length <= 1)
    // Decorator is used as the factory or applied with config.
    return (...args2: any[]): any => decorateUniversal([...args2, ...args]);

  // Destructuring of dynamic arguments.
  const [target, property, descriptor, configuration] = args;

  // Verify that the decorator is used correctly.
  if (!isPlainObject(descriptor)) throwIncorrectUsage();

  // Create new decorator based on the property and configuration.
  const newlyCreatedDecorator: any =
    isFunction(descriptor.value) || isOriginallyMethod(target, property)
      ? methodLegacyDecorator(getDecoratorId(), decorateMethod, configuration)
      : isFunction(descriptor.get) || isFunction(descriptor.set)
      ? configuration?.setter || (descriptor.set && !descriptor.get)
        ? accessorLegacyDecorator(getDecoratorId(), decorateSetter, configuration)
        : accessorLegacyDecorator(getDecoratorId(), decorateGetter, configuration)
      : throwIncorrectUsage();

  // Execute newly created decorator.
  return newlyCreatedDecorator(target, property, descriptor);
}

/**
 * Clear the cached results of the method or getter.
 *
 * @param config Configuration.
 * @return Method or accessor decorator.
 */
export function CacheClear(config?: ClearConfig): MethodDecorator;

/**
 * Clear the cached results of the method or getter.
 *
 * @param target Class (prototype).
 * @param property Property name.
 * @param descriptor Property Descriptor.
 * @return Descriptor with clear logic.
 */
export function CacheClear(target: object, property: PropertyKey, descriptor: PropertyDescriptor): PropertyDescriptor;
export function CacheClear(...args: any[]): any {
  return decorateUniversal.call(null, args);
}

/**
 * Clear the cached results of the method or getter.
 *
 * @param config Configuration.
 * @return Method or accessor decorator.
 */
export function cacheClear(config?: ClearConfig): MethodDecorator;

/**
 * Clear the cached results of the method or getter.
 *
 * @param target Class (prototype).
 * @param property Property name.
 * @param descriptor Property Descriptor.
 * @return Descriptor with clear logic.
 */
export function cacheClear(target: object, property: PropertyKey, descriptor: PropertyDescriptor): PropertyDescriptor;
export function cacheClear(...args: any[]): any {
  return decorateUniversal.call(null, args);
}
