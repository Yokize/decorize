import isArray from 'lodash/isArray';
import isObject from 'lodash/isObject';
import isString from 'lodash/isString';
import isBoolean from 'lodash/isBoolean';
import isFunction from 'lodash/isFunction';
import isUndefined from 'lodash/isUndefined';
import { Decorator } from '@decorize/core/decorator';
import { getOwnKeys } from '@decorize/core/reflect/getOwnKeys';
import { getClassName } from '@decorize/core/class/getClassName';
import { defineProperty } from '@decorize/core/reflect/defineProperty';
import { toAccessorType } from '@decorize/core/descriptor/toAccessorType';
import { isAccessorType } from '@decorize/core/descriptor/isAccessorType';
import { isBuiltInProperty } from '@decorize/core/class/isBuiltInProperty';
import { isOriginallyMethod } from '@decorize/core/original/isOriginallyMethod';
import { classLegacyDecorator } from '@decorize/core/legacy/classLegacyDecorator';
import { methodLegacyDecorator } from '@decorize/core/legacy/methodLegacyDecorator';
import { accessorLegacyDecorator } from '@decorize/core/legacy/accessorLegacyDecorator';
import { propertyLegacyDecorator } from '@decorize/core/legacy/propertyLegacyDecorator';
import { getOwnPropertyDescriptor } from '@decorize/core/reflect/getOwnPropertyDescriptor';
import { DeprecateConfig, throwUsageError, uniqueId } from '../deprecate';
import { Global, WarningConfig } from '../global';

/**
 * Deprecate the object own properties.
 *
 * @param target The object with properties.
 * @ignore
 */
function deprecateObject(target: object): void {
  // Iterate and decorate own properties of an object.
  getOwnKeys(target).forEach((property: PropertyKey): void => {
    // Ignore built-in reserved properties.
    if (isBuiltInProperty(target, property)) return;

    // Arguments used to decorate property.
    const args: any[] = [target, property];

    // Get the descriptor of the property.
    const descriptor: PropertyDescriptor = getOwnPropertyDescriptor(target, property);

    // Determine whether descriptor is defined.
    /* istanbul ignore next */
    if (!descriptor?.configurable)
      // Ignore non configurable property.
      return;
    // A descriptor is needed for decoration.
    else args.push(descriptor);

    // New created descriptor for method and accessor.
    // eslint-disable-next-line
    const newDescriptor = deprecateDecorator(args);

    // Re-define property with deprecate logic.
    if (newDescriptor) Object.defineProperty(target, property, newDescriptor);
  });
}

/**
 * Decorate the class to deprecate it.
 *
 * @param target Class.
 * @param configuration Configuration.
 * @return Decorated class and its properties.
 * @ignore
 */
function classDecoratorLogic(target: Function, configuration?: DeprecateConfig): Function {
  // Deprecate properties of class.
  deprecateObject(target);

  // Deprecate properties of prototype.
  deprecateObject(target.prototype);

  // Returns the decorated class.
  return class extends (<any>target) {
    public constructor(...args: any) {
      super(...args);

      // Output warning about deprecated class.
      Global.outputWarning({
        type: Decorator.Class,
        name: [target.name],
        message: configuration?.message
      });
    }
  };
}

/**
 * Decorate the method to deprecate it.
 *
 * @param target Class (prototype).
 * @param property Method name.
 * @param descriptor Method Descriptor.
 * @param configuration Decorator configuration.
 * @return The descriptor with the deprecate logic.
 * @ignore
 */
function methodDecoratorLogic(
  target: object,
  property: PropertyKey,
  descriptor: PropertyDescriptor,
  configuration?: DeprecateConfig
): PropertyDescriptor {
  // Create the new accessor descriptor based on the existing `descriptor`
  // with respect to already assigned attributes.
  const { get, ...newDescriptor }: any = toAccessorType(property, descriptor);

  // Create the new getter with enhanced logic to wrap the original method
  // and notify about its deprecation.
  newDescriptor.get = function deprecateMethodLogic(this: object): Function {
    // Output warning about deprecated method.
    Global.outputWarning({
      type: Decorator.Method,
      name: [getClassName(target), property],
      message: configuration?.message
    });

    // The function can be obtained from the created descriptor by
    // executing `get` with context.
    return get.call(this);
  };

  // Returns the descriptor with the deprecate logic.
  return newDescriptor;
}

/**
 * Decorate the accessor to deprecate it.
 *
 * @param target Class (prototype).
 * @param property Property name.
 * @param descriptor Property Descriptor.
 * @param configuration Decorator configuration.
 * @return The descriptor with the deprecate logic.
 * @ignore
 */
function accessorDecoratorLogic(
  target: object,
  property: PropertyKey,
  descriptor: PropertyDescriptor,
  configuration?: DeprecateConfig
): PropertyDescriptor {
  // Create the new accessor descriptor based on the existing `descriptor`
  // with respect to already assigned attributes.
  const { get, set, ...newDescriptor }: any = toAccessorType(property, descriptor);

  // Configuration used to output warning message.
  const warningConfig: WarningConfig = {
    type: Decorator.Accessor,
    name: [getClassName(target), property],
    message: configuration?.message
  };

  // Get the configuration related to accessor decoration.
  let { getter, setter } = configuration ?? {};

  // In case configuration is not exist deprecate getter and setter.
  if (!isBoolean(getter) && !isBoolean(setter)) getter = setter = true;

  if (getter) {
    // Create the new getter with enhanced logic to wrap the original getter
    // and notify about its deprecation.
    newDescriptor.get = function deprecateGetterLogic(this: object): any {
      // Output warning about deprecated getter.
      Global.outputWarning(warningConfig);

      // Execute original getter.
      return get.call(this);
    };
  } else newDescriptor.get = get;

  if (setter) {
    // Create the new setter with enhanced logic to wrap the original setter
    // and notify about its deprecation.
    newDescriptor.set = function deprecateSetterLogic(this: object, value: any): void {
      // Output warning about deprecated setter.
      Global.outputWarning(warningConfig);

      // Execute original setter.
      set.call(this, value);
    };
  } else newDescriptor.set = set;

  // Returns the descriptor with the deprecate logic.
  return newDescriptor;
}

/**
 * Decorate the property to deprecate it.
 *
 * @param target Class (prototype).
 * @param property Property name.
 * @param configuration Decorator configuration.
 * @ignore
 */
function propertyDecoratorLogic(target: object, property: PropertyKey, configuration?: DeprecateConfig): void {
  // Get the descriptor of the property.
  // eslint-disable-next-line
  let { get, set, value, writable, ...newDescriptor }: any = getOwnPropertyDescriptor(target, property) ?? {
    configurable: true,
    enumerable: true
  };

  // Configuration used to output warning message.
  const warningConfig: WarningConfig = {
    type: Decorator.Property,
    name: [getClassName(target), property],
    message: configuration?.message
  };

  // Create the new getter with enhanced logic to wrap the original property
  // and notify about its deprecation.
  newDescriptor.get = function deprecateGetterLogic(this: object): any {
    // Output warning about deprecated getter.
    Global.outputWarning(warningConfig);

    // Return original value.
    /* istanbul ignore next */
    return get?.call(this) ?? value;
  };

  // Determine whether property is writable.
  if (isBoolean(writable) ? writable : true) {
    // Create the new setter with enhanced logic to wrap the original property
    // and notify about its deprecation.
    newDescriptor.set = function deprecateSetterLogic(this: object, newValue: any): void {
      // Output warning about deprecated setter.
      Global.outputWarning(warningConfig);

      // Set value.
      value = newValue;
    };
  }

  // Re-define property with deprecate logic.
  defineProperty(target, property, newDescriptor);
}

/**
 * Universal decoration (without type checking).
 *
 * @param args Dynamic arguments.
 * @ignore
 */
function deprecateDecorator(args: any[]): any {
  if (args.length === 0)
    // If there are no arguments, the decorator is used as a factory.
    return (...args2: any[]): any => deprecateDecorator([...args2]);

  if (isString(args[0]) || isArray(args[0]))
    // If the first argument is a string or an array, the decorator is used
    // as a factory with configs.
    return (...args2: any[]): any => deprecateDecorator([...args2, { message: isArray(args[0]) ? args[0] : args }]);

  if (args.length === 1 && !isFunction(args[0]))
    // If there is only one argument that is not a function, the decorator
    // was applied as a factory with config.
    return (...args2: any[]): any => deprecateDecorator([...args2, ...args]);

  // Destructuring the dynamic arguments.
  const [target, property, descriptor] = args;

  if (args.length === 1 || (args.length === 2 && isObject(args[1])))
    // If there are one or two (second is config) arguments, the decorator
    // is applied to the class.
    return classLegacyDecorator(uniqueId, args[1], classDecoratorLogic).call(null, ...args);

  if (isFunction(descriptor?.value) || isOriginallyMethod(target, property))
    // If the descriptor contains the function value or property originally
    // defined as a method, the decorator is applied to the method.
    return methodLegacyDecorator(uniqueId, args[3], methodDecoratorLogic).call(null, ...args);

  if (isAccessorType(descriptor))
    // If the descriptor has a getter or setter, the decorator is applied to the accessor.
    return accessorLegacyDecorator(uniqueId, args[3], accessorDecoratorLogic).call(null, ...args);

  if (isUndefined(descriptor) || (descriptor && !isFunction(descriptor.value)))
    // If there are no description, the decorator is applied to the property.
    return propertyLegacyDecorator(uniqueId, args[3], propertyDecoratorLogic).call(null, ...args);

  // Error in case the decorator used incorrectly.
  throwUsageError();
}

/**
 * Decorator to deprecate the class.
 *
 * @param target Class.
 * @return Decorated class.
 */
export function Deprecate<T extends Function>(target: T): T;

/**
 * Decorator to deprecate the property.
 *
 * @param target Class (prototype).
 * @param property Property name.
 * @return The descriptor with the deprecate logic.
 */
export function Deprecate(target: object, property: PropertyKey): void;

/**
 * Decorator to deprecate the method and accessor.
 *
 * @param target Class (prototype).
 * @param property Property name.
 * @param descriptor Property descriptor.
 * @return The descriptor with the deprecate logic.
 */
export function Deprecate(target: object, property: PropertyKey, descriptor: PropertyDescriptor): PropertyDescriptor;

/**
 * Decorator to deprecate the class, method, accessor and property.
 *
 * @param configuration Decorator configuration.
 * @return Class, method, accessor or property decorator.
 */
export function Deprecate(configuration: DeprecateConfig): any;

/**
 * Decorator to deprecate the class, method, accessor and property.
 *
 * @param message Deprecation message.
 * @return Class, method, accessor or property decorator.
 */
export function Deprecate(message: string | string[]): any;

/**
 * Decorator to deprecate the class, method, accessor and property.
 *
 * @return Class, method, accessor or property decorator.
 */
export function Deprecate(...args: any[]): any;
export function Deprecate(...args: any[]): any {
  return deprecateDecorator(args);
}

/**
 * Decorator to deprecate the class.
 *
 * @param target Class.
 * @return Decorated class.
 */
export function deprecate<T extends Function>(target: T): T;

/**
 * Decorator to deprecate the property.
 *
 * @param target Class (prototype).
 * @param property Property name.
 * @return The descriptor with the deprecate logic.
 */
export function deprecate(target: object, property: PropertyKey): void;

/**
 * Decorator to deprecate the method and accessor.
 *
 * @param target Class (prototype).
 * @param property Property name.
 * @param descriptor Property descriptor.
 * @return The descriptor with the deprecate logic.
 */
export function deprecate(target: object, property: PropertyKey, descriptor: PropertyDescriptor): any;

/**
 * Decorator to deprecate the class, method, accessor and property.
 *
 * @param configuration Decorator configuration.
 * @return Class, method, accessor or property decorator.
 */
export function deprecate(configuration: DeprecateConfig): any;

/**
 * Decorator to deprecate the class, method, accessor and property.
 *
 * @param message Deprecation message.
 * @return Class, method, accessor or property decorator.
 */
export function deprecate(message: string | string[]): any;

/**
 * Decorator to deprecate the class, method, accessor and property.
 *
 * @return Class, method, accessor or property decorator.
 */
export function deprecate(...args: any[]): any;
export function deprecate(...args: any[]): any {
  return deprecateDecorator(args);
}
