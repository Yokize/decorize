import isObject from 'lodash/isObject';

/* istanbul ignore next */
const builtInReflect: any = Reflect?.has;

/**
 * Reflect works like the built-in `in` operator. Exceptional case is
 * aligned and violation of target type throws a TypeError.
 */
const _hasProperty: (target: object, property: PropertyKey) => boolean =
  builtInReflect ??
  function hasPropertyFk(target: object, property: PropertyKey): boolean {
    // Verify whether target is object.
    if (isObject(target))
      // Check on object or prototype chain.
      return property in target;
    else throw new TypeError('Existence of the property can be checked only on the object');
  };

/**
 * Determine whether the object or its prototype chain has the property.
 *
 * @param target Object in which to look for the property.
 * @param property Name of the property to check.
 * @return True in case has the property; false otherwise.
 */
export function hasProperty(target: object, property: PropertyKey): boolean {
  return _hasProperty(target, property);
}
