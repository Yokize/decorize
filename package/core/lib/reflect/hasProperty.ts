import isObject from 'lodash/isObject';

/* istanbul ignore next */
const ReflectBuiltIn: any = Reflect?.has;

/**
 * Reflect works as a built-in operator `in`.
 */
const _hasProperty: (target: object, property: PropertyKey) => boolean =
  ReflectBuiltIn ??
  function hasPropertyFk(target: object, property: PropertyKey): boolean {
    if (isObject(target)) return property in target;
    else throw new TypeError('Existence of the property can be checked only at the object');
  };

/**
 * Determine whether the `target` or its prototype chain has the `property`.
 *
 * @param target The object in which to look for the property.
 * @param property The name of the property to check.
 * @return True in case has the property; false otherwise.
 * @throws TypeError in case of target type violation.
 */
export function hasProperty(target: object, property: PropertyKey): boolean {
  return _hasProperty(target, property);
}
