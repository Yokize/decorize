import pick from 'lodash/pick';
import isFunction from 'lodash/isFunction';
import isPlainObject from 'lodash/isPlainObject';
import { getOwnKeys } from '@decorize/core/reflect/getOwnKeys';
import { createSetter } from '@decorize/core/accessor/createSetter';
import { hasOwnProperty } from '@decorize/core/reflect/hasOwnProperty';
import { defineProperty } from '@decorize/core/reflect/defineProperty';
import { isOriginallyMethod } from '@decorize/core/original/isOriginallyMethod';
import { classLegacyDecorator } from '@decorize/core/legacy/classLegacyDecorator';
import { methodLegacyDecorator } from '@decorize/core/legacy/methodLegacyDecorator';
import { getOwnPropertyDescriptor } from '@decorize/core/reflect/getOwnPropertyDescriptor';
import { getDecoratorId, hasBoundMethod, getBoundMethod, setBoundMethod, throwIncorrectUsage } from '../bind';

/**
 * Decorate the method to make it context-bound.
 *
 * @param target Class (prototype).
 * @param property Method name.
 * @param descriptor Method descriptor.
 * @return Descriptor with bind logic.
 */
function decorateMethod(target: object, property: PropertyKey, descriptor: PropertyDescriptor): PropertyDescriptor {
  // Attributes used to create new behaviour.
  const { get, set, value }: PropertyDescriptor = descriptor;

  // New descriptor with predefined bind logic.
  const newDescriptor: PropertyDescriptor = pick(descriptor, ['configurable', 'enumerable']);

  // Create new setter or use from an existing descriptor.
  newDescriptor.set = isFunction(get) || isFunction(set) ? set : createSetter(property);

  // Create new getter to bind the function on the fly or get it from the cache.
  newDescriptor.get = function bindLogic(this: object): Function {
    // Function which will be bound to the context.
    const fn: Function = get?.call(this) ?? value;

    // Verify that the function is the correct type.
    if (!isFunction(fn)) throwIncorrectUsage();

    // Return the original function in case its accessed from the prototype.
    if (hasOwnProperty(this, 'constructor')) return fn;

    // Determine whether the bound function is already cached.
    if (!hasBoundMethod(this, property))
      // Create the bound function and cache it.
      setBoundMethod(this, property, fn.bind(this));

    // Get the bound function from the cache.
    return getBoundMethod(this, property);
  };

  // Return new descriptor with bind logic.
  return newDescriptor;
}

/**
 * Decorate the class to make own methods context-bound.
 *
 * @param target Class to decorate.
 * @return Class with decorated methods.
 */
function decorateClass(target: Function): Function {
  // Bind is limited to methods from the prototype.
  const { prototype } = target;

  // Iterate properties and determine which of them can be decorated.
  getOwnKeys(prototype).forEach((property: PropertyKey): void => {
    // Ignore the built-in reserved property.
    if (property === 'constructor') return;

    // Descriptor to verify whether the property contains the function.
    const descriptor: PropertyDescriptor = getOwnPropertyDescriptor(prototype, property);

    // Proceed to decoration only in case property has been verified.
    if ((isPlainObject(descriptor) && isFunction(descriptor.value)) || isOriginallyMethod(prototype, property))
      // Create and define the function with bind logic based on the existing class method.
      defineProperty(prototype, property, decorateMethod(prototype, property, descriptor));
  });

  // Return the decorated class.
  return target;
}

/**
 * Universal decorator (without type checking).
 */
function decorateUniversal(args: any[]): any {
  if (args.length === 0)
    // Decorator is used as the factory.
    return (...args2: any[]): any => decorateUniversal(args2);

  if (args.length === 1)
    // Decorator is applied to the class.
    return classLegacyDecorator(getDecoratorId(), decorateClass).call(null, ...args);

  // Destructuring of dynamic arguments.
  const [target, property, descriptor] = args;

  // Verify that the decorator is used correctly.
  if (!isPlainObject(descriptor)) throwIncorrectUsage();

  // Decorator is applied to the method.
  if (isFunction(descriptor.value) || isOriginallyMethod(target, property))
    return methodLegacyDecorator(getDecoratorId(), decorateMethod).call(null, ...args);

  // Error in case the decorator used incorrectly.
  throwIncorrectUsage();
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
  return decorateUniversal(args);
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
  return decorateUniversal(args);
}
