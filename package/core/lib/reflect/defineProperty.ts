import isObject from 'lodash/isObject';

/* istanbul ignore next */
const ReflectBuiltIn: any = Reflect?.defineProperty;

/**
 * Reflect and Object built-in functions differs in the return value of the
 * operation. The built-in function of the Object returns the `target` when
 * its successful, otherwise it throws a TypeError. Reflect returns operation
 * status. The fallback implementation is aligned to return the Boolean, which
 * determines the success of the operation.
 */
const _defineProperty: (target: object, property: PropertyKey, descriptor: PropertyDescriptor) => boolean =
  ReflectBuiltIn ??
  function definePropertyFk(target: object, property: PropertyKey, descriptor: PropertyDescriptor): boolean {
    if (isObject(target))
      try {
        Object.defineProperty(target, property, descriptor);
        return true;
      } catch {
        return false;
      }
    else throw new TypeError('Property can be defined only on the object');
  };

/**
 * Add `property` to the `target` or change the attributes of an existing `property`.
 *
 * @param target The object in which to add or modify the property.
 * @param property The name of the property to be added or modified.
 * @param descriptor The descriptor which determine the property.
 * @return True in case operation is successful; false otherwise.
 * @throws TypeError in case of target type violation.
 */
export function defineProperty(target: object, property: PropertyKey, descriptor: PropertyDescriptor): boolean {
  return _defineProperty(target, property, descriptor);
}
