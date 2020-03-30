import isNil from 'lodash/isNil';
import isObject from 'lodash/isObject';
import isFunction from 'lodash/isFunction';
import { ContextType } from '@decorize/core/context/contextType';
import { getContextType } from '@decorize/core/context/getContextType';
import { hasOwnProperty } from '@decorize/core/reflect/hasOwnProperty';
import { getPrototypeOf } from '@decorize/core/reflect/getPrototypeOf';
import { toAccessorType } from '@decorize/core/descriptor/toAccessorType';
import { isOriginallyMethod } from '@decorize/core/original/isOriginallyMethod';
import { methodLegacyDecorator } from '@decorize/core/legacy/methodLegacyDecorator';
import { accessorLegacyDecorator } from '@decorize/core/legacy/accessorLegacyDecorator';
import { ClearConfig, throwUsageError, uniqueId } from '../clear';
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
function methodDecoratorLogic(
  target: object,
  property: PropertyKey,
  descriptor: PropertyDescriptor,
  configuration?: ClearConfig
): PropertyDescriptor {
  // Create the new accessor descriptor based on the existing `descriptor`
  // with respect to already assigned attributes.
  const { get, ...newDescriptor }: any = toAccessorType(property, descriptor);

  // Create the new getter with enhanced logic to wrap the original method
  // and clear the cache.
  newDescriptor.get = function clearCacheGetter(this: object): Function {
    // The original function can be obtained from the accessor descriptor
    // by executing `get` with context.
    const fn: Function = get.call(this);

    // Ensure the result obtained from `get` is the correct type.
    if (!isFunction(fn)) throwUsageError();

    // In case the `constructor` property directly belongs to the context,
    // it is reasonable to conclude that the context is the prototype and
    // not the class or its instance.
    if (hasOwnProperty(this, 'constructor'))
      // Returns the original function.
      return fn;

    // It's important to determine whether the context is the original
    // or descendant class (its instance).
    const ctxType: ContextType = getContextType(this, target, property);

    // The ES2015+ specification defines `super` as the reference to the
    // context of the outer method. There is no need to cache result of
    // an overridden method that is accessed via `super` to support ES5
    // compatibility.
    if (ctxType === ContextType.Inheritor && hasOwnProperty(getPrototypeOf(this), property))
      // Returns the original function.
      return fn;

    // Create the wrapper with the logic to clear the cache.
    return function cacheLogic(this: object, ...args: any[]): any {
      // Execute without cache in case the context is nil.
      if (isNil(this)) return fn.apply(this, args);

      // Clear the cache before executing the method.
      if (configuration?.before) Global.clear(this);

      // The result of the method.
      const result: any = fn.apply(this, args);

      //  Clear the cache after executing the method.
      if (configuration?.after || !configuration?.before) Global.clear(this);

      // Returns the result of the method.
      return result;
    };
  };

  // Returns the descriptor with the clear logic.
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
function getterDecoratorLogic(
  target: object,
  property: PropertyKey,
  descriptor: PropertyDescriptor,
  configuration?: ClearConfig
): PropertyDescriptor {
  // Create the new accessor descriptor based on the existing `descriptor`
  // with respect to already assigned attributes.
  const { get, ...newDescriptor }: any = toAccessorType(property, descriptor);

  // Create the new getter with enhanced logic to wrap the original getter
  // and clear the cache.
  newDescriptor.get = function getterClearCacheLogic(this: object): any {
    // In case the `constructor` property directly belongs to the context,
    // it is reasonable to conclude that the context is the prototype and
    // not the class or its instance.
    if (hasOwnProperty(this, 'constructor'))
      // Returns the result of the original getter.
      return get.call(this);

    // It's important to determine whether the context is the original
    // or descendant class (its instance).
    const ctxType: ContextType = getContextType(this, target, property);

    // The ES2015+ specification defines `super` as the reference to the
    // context of the outer getter. There is no need to clear the cache
    // in case an overridden getter is accessed via `super` to support
    // ES5 compatibility.
    if (ctxType === ContextType.Inheritor && hasOwnProperty(getPrototypeOf(this), property))
      // Return result of original getter.
      return get.call(this);

    // Clear the cache before executing the getter.
    if (configuration?.before) Global.clear(this);

    // The result of the getter.
    const result: any = get.call(this);

    // Clear the cache after executing the getter.
    if (configuration?.after || !configuration?.before) Global.clear(this);

    // Returns the result of the getter.
    return result;
  };

  // Returns the descriptor with the clear logic.
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
function setterDecoratorLogic(
  target: object,
  property: PropertyKey,
  descriptor: PropertyDescriptor,
  configuration?: ClearConfig
): PropertyDescriptor {
  // Create the new accessor descriptor based on the existing `descriptor`
  // with respect to already assigned attributes.
  const { set, ...newDescriptor }: any = toAccessorType(property, descriptor);

  // Create the new setter with enhanced logic to wrap the original setter
  // and clear the cache.
  newDescriptor.set = function setterClearCacheLogic(this: object, ...args: any[]): any {
    // In case the `constructor` property directly belongs to the context,
    // it is reasonable to conclude that the context is the prototype and
    // not the class or its instance.
    if (hasOwnProperty(this, 'constructor'))
      // Execute the original setter.
      return set.call(this, ...args);

    // It's important to determine whether the context is the original
    // or descendant class (its instance).
    const ctxType: ContextType = getContextType(this, target, property);

    // The ES2015+ specification defines `super` as the reference to the
    // context of the outer setter. There is no need to clear the cache
    // in case an overridden setter is accessed via `super` to support
    // ES5 compatibility.
    if (ctxType === ContextType.Inheritor && hasOwnProperty(getPrototypeOf(this), property))
      // Execute the original setter.
      return set.call(this, ...args);

    // Clear the cache before executing the setter.
    if (configuration?.before) Global.clear(this);

    // Execute the original setter.
    set.call(this, ...args);

    // Clear the cache after executing the setter.
    if (configuration?.after || !configuration?.before) Global.clear(this);
  };

  // Returns the descriptor with the clear logic.
  return newDescriptor;
}

/**
 * Universal decoration (without type checking).
 */
function cacheClearDecorator(args: any[]): any {
  if (args.length <= 1)
    // If there are one or less arguments, the decorator was used as a factory
    // or applied with config.
    return (...args2: any[]): any => cacheClearDecorator([...args2, ...args]);

  // Destructuring of dynamic arguments.
  const [target, property, descriptor, configuration] = args;

  // Ensure the decorator is used correctly.
  if (!isObject(descriptor)) throwUsageError();

  // If there are three arguments, the decorator was applied to the method or accessor.
  const newlyCreatedDecorator: any =
    isFunction((<any>descriptor).value) || isOriginallyMethod(target, property)
      ? methodLegacyDecorator(uniqueId, methodDecoratorLogic, configuration)
      : isFunction((<any>descriptor).get) || isFunction((<any>descriptor).set)
      ? configuration?.setter || ((<any>descriptor).set && !(<any>descriptor).get)
        ? accessorLegacyDecorator(uniqueId, setterDecoratorLogic, configuration)
        : accessorLegacyDecorator(uniqueId, getterDecoratorLogic, configuration)
      : throwUsageError();

  // Execute newly created decorator.
  return newlyCreatedDecorator(target, property, descriptor);
}

/**
 * Clear the cached results of the method or getter.
 *
 * @param config Config.
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
  return cacheClearDecorator.call(null, args);
}

/**
 * Clear the cached results of the method or getter.
 *
 * @param config Config.
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
  return cacheClearDecorator.call(null, args);
}
