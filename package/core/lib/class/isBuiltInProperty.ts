import isFunction from 'lodash/isFunction';

// Built-in properties of the class.
const builtIn: PropertyKey[] = ['name', 'prototype', 'length'];

/**
 * Determine whether is built-in property of the class or prototype.
 *
 * @param target Class (property).
 * @param property Property name.
 * @return True in case property is built-in; false otherwise.
 */
export function isBuiltInProperty(target: object, property: PropertyKey): boolean {
  return isFunction(target) ? builtIn.indexOf(property) >= 0 : property === 'constructor';
}
