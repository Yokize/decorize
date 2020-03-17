import isObject from 'lodash/isObject';

/* istanbul ignore next */
const builtInReflect: any = Reflect?.defineProperty;

/**
 * Reflect and Object built-in is differ in return value of operation. Object
 * built-in function returns the target object when its successful, otherwise
 * it throws a TypeError. Reflect returns the operation status. Fallback is
 * aligned to return boolean, which determine whether the execution is successful.
 * Exceptional case is aligned and violation of target type throws a TypeError.
 */
const _defineProperty: (target: object, property: PropertyKey, descriptor: PropertyDescriptor) => boolean =
  builtInReflect ??
  function definePropertyFk(target: object, property: PropertyKey, descriptor: PropertyDescriptor): boolean {
    // Verify whether target is object.
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
 * Add property to an object or change the attributes of existing property.
 *
 * @param target Object in which to add or modify the property.
 * @param property Name of the property to be added or modified.
 * @param descriptor Descriptor for the property.
 * @return True in case operation is successful; false otherwise.
 * @throws TypeError in case of non-object target.
 */
export function defineProperty(target: object, property: PropertyKey, descriptor: PropertyDescriptor): boolean {
  return _defineProperty(target, property, descriptor);
}
