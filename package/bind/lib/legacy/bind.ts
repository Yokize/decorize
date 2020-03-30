import isObject from 'lodash/isObject';
import isFunction from 'lodash/isFunction';
import isUndefined from 'lodash/isUndefined';
import { getOwnKeys } from '@decorize/core/reflect/getOwnKeys';
import { ContextType } from '@decorize/core/context/contextType';
import { defineMetadata } from '@decorize/core/reflect/defineMetadata';
import { getOwnMetadata } from '@decorize/core/reflect/getOwnMetadata';
import { hasOwnProperty } from '@decorize/core/reflect/hasOwnProperty';
import { defineProperty } from '@decorize/core/reflect/defineProperty';
import { getPrototypeOf } from '@decorize/core/reflect/getPrototypeOf';
import { toAccessorType } from '@decorize/core/descriptor/toAccessorType';
import { isOriginallyMethod } from '@decorize/core/original/isOriginallyMethod';
import { classLegacyDecorator } from '@decorize/core/legacy/classLegacyDecorator';
import { methodLegacyDecorator } from '@decorize/core/legacy/methodLegacyDecorator';
import { getInstanceContextType } from '@decorize/core/context/getContextType';
import { getOwnPropertyDescriptor } from '@decorize/core/reflect/getOwnPropertyDescriptor';
import { Metadata, throwUsageError, uniqueId } from '../bind';

/**
 * Decorate the method to make it context-bound.
 *
 * @param target Prototype.
 * @param property Method name.
 * @param descriptor Method descriptor.
 * @return Descriptor with bind logic.
 */
function methodDecoratorLogic(
  target: object,
  property: PropertyKey,
  descriptor: PropertyDescriptor
): PropertyDescriptor {
  // Create the new accessor descriptor based on the existing `descriptor`
  // with respect to already assigned attributes.
  const { get, ...newDescriptor }: any = toAccessorType(property, descriptor);

  // Create the new getter with enhanced logic to wrap the original method
  // and bind it on the fly. The bound function is cached to avoid double
  // bindings and to increase performance on re-access.
  newDescriptor.get = function bindLogic(this: object): Function {
    // The function which should be bound can be obtained from the accessor
    // descriptor by executing `get` with context.
    const fn: Function = get.call(this);

    // Ensure the result obtained from `get` is the correct type.
    if (!isFunction(fn)) throwUsageError();

    // In case the `constructor` property directly belongs to the context,
    // it is reasonable to conclude that the context is the prototype and
    // not an instance of the class.
    if (hasOwnProperty(this, 'constructor'))
      // Returns the original function.
      return fn;

    // Binding is done only for the instance methods, so it is important to
    // determine whether an instance is initiated directly from the `target`
    // or the descendant class.
    const ctxType: ContextType = getInstanceContextType(this, target, property);

    // The ES2015+ specification defines `super` as the reference to the context
    // of the outer method. There is no need to bind an overridden method that
    // is accessed via `super` to support ES5 compatibility.
    if (ctxType === ContextType.Inheritor && hasOwnProperty(getPrototypeOf(this), property))
      // Returns the original function.
      return fn;

    // Binding the method to the context with unknown origin is not reasonable,
    // as it can lead to unexpected behavior, so developers must manage the
    // binding themselves.
    if (ctxType === ContextType.Unknown)
      // Returns the original function.
      return fn;

    // Create blank or get already existing own metadata that contains cached
    // context-dependent bound function.
    let { bound }: Metadata = getOwnMetadata(uniqueId, this, property) ?? {};

    // Determine whether the bound function is missing in the metadata.
    if (isUndefined(bound)) {
      // Bind the original function to the context.
      bound = fn.bind(this);

      // Define the metadata with context-dependent bound function.
      defineMetadata(uniqueId, { bound }, this, property);
    }

    // Returns the bound function.
    return bound;
  };

  // Returns the descriptor with the bind logic.
  return newDescriptor;
}

/**
 * Decorate the class to make own methods context-bound.
 *
 * @param target Class to decorate.
 * @return Class with decorated methods.
 */
function classDecoratorLogic(target: Function): Function {
  // Binding is limited only to the instance methods, so its necessary
  // to get a `prototype` of the class.
  const { prototype } = target;

  // Iterate properties and determine which of them can be decorated.
  getOwnKeys(prototype).forEach((property: PropertyKey): void => {
    // The property is already defined on the `prototype`, so can get
    // the descriptor to check its suitability for decoration.
    const descriptor: PropertyDescriptor = getOwnPropertyDescriptor(prototype, property);

    // Ignore built-in reserved or non-configurable properties.
    if (property === 'constructor' || !descriptor.configurable) return;

    // Proceed to decoration only in case the property has been verified
    // as the method. The easiest way to do this is just to check that the
    // value is a function type. The more complex case is when the property
    // is already decorated and the descriptor is modified, so the original
    // type must be checked.
    if (isFunction(descriptor.value) || isOriginallyMethod(prototype, property))
      // Override existing method to an enhanced function.
      defineProperty(prototype, property, methodDecoratorLogic(prototype, property, descriptor));
  });

  // Returns the decorated class.
  return target;
}

/**
 * Universal decoration (without type checking).
 */
function bindDecorator(args: any[]): any {
  if (args.length === 0)
    // If there are no arguments, the decorator was used as a factory.
    return (...args2: any[]): any => bindDecorator(args2);

  if (args.length === 1 && args[0])
    // If there is one argument, the decorator was applied to the class.
    return classLegacyDecorator(uniqueId, classDecoratorLogic).call(null, ...args);

  // Destructuring of dynamic arguments.
  const [target, property, descriptor] = args;

  // Avoid decoration of static properties.
  if (isFunction(target)) return;

  // Ensure the decorator is used correctly.
  if (!isObject(descriptor)) throwUsageError();

  // If there are three arguments, the decorator was applied to the method.
  if (isFunction((<any>descriptor).value) || isOriginallyMethod(target, property))
    return methodLegacyDecorator(uniqueId, methodDecoratorLogic).call(null, ...args);

  // Error in case the decorator used incorrectly.
  throwUsageError();
}

/**
 * Bind all the methods of the class to the context used to access it.
 *
 * @param target Class.
 * @return Decorated class.
 */
export function Bind<T extends Function>(target: T): T;

/**
 * Bind the method or all methods of the class to the context used to access it.
 *
 * @return Class or method decorator.
 */
export function Bind(): ClassDecorator & MethodDecorator;

/**
 * Bind the method to the context used to access it.
 *
 * @param target Class (prototype).
 * @param property Method name.
 * @param descriptor Method descriptor.
 * @return Descriptor with bind logic.
 */
export function Bind(target: object, property: PropertyKey, descriptor: PropertyDescriptor): PropertyDescriptor;
export function Bind(...args: any[]): any {
  return bindDecorator(args);
}

/**
 * Bind all the methods of the class to the context used to access it.
 *
 * @param target Class.
 * @return Decorated class.
 */
export function bind<T extends Function>(target: T): T;

/**
 * Bind the method or all methods of the class to the context used to access it.
 *
 * @return Class or method decorator.
 */
export function bind(): ClassDecorator & MethodDecorator;

/**
 * Bind the method to the context used to access it.
 *
 * @param target Class (prototype).
 * @param property Method name.
 * @param descriptor Method descriptor.
 * @return Descriptor with bind logic.
 */
export function bind(target: object, property: PropertyKey, descriptor: PropertyDescriptor): PropertyDescriptor;
export function bind(...args: any[]): any {
  return bindDecorator(args);
}
