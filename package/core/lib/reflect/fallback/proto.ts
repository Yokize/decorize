import isFunction from 'lodash/isFunction';
import { getPrototypeOf } from '../getPrototypeOf';

/**
 * Guess class inheritance by deeper analysis of the super.
 *
 * @param clazz Class for analysis.
 * @return Prototype; null in case of non existing parent.
 */
function guessClassInheritance(clazz: any): object | undefined {
  // Try to determine the heritage by checking super prototype.
  const superProto: any | undefined = getPrototypeOf(clazz.prototype);

  // In case the prototype is empty or Object.prototype inheritance is unclear.
  if (!superProto || superProto === Object.prototype) return getPrototypeOf(clazz);

  // In case the constructor is not a function or exist self reference, inheritance is unclear.
  if (!isFunction(superProto.constructor) || superProto.constructor === clazz) return getPrototypeOf(clazz);

  // Guessing can be done only by the constructor.
  return superProto.constructor;
}

/**
 * Get proto of the object to support feature to access the metadata by chain.
 * Using built-in getPrototypeOf or custom logic to get the proto of the object.
 * Custom logic aligned with Reflect polyfill way of retrieving the prototype.
 *
 * @param target The object used to get the proto.
 * @return Prototype; null in case of non existing prototype.
 */
export function getProtoOf(target: any): object | undefined {
  // Retrieve the prototype using native getPrototypeOf.
  const prototype: any = getPrototypeOf(target);

  // Can rely purely on native getPrototypeOf in case the target
  // is not a class or already on top of chain.
  if (!isFunction(target) || target === Function.prototype) return prototype;

  // In case retrieved prototype is super class.
  if (prototype !== Function.prototype) return prototype;

  // Try to guess the class inheritance by deep analysis.
  return guessClassInheritance(target);
}
