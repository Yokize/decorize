import isObject from 'lodash/isObject';

/**
 * Determine whether the `target` has own `property` (opposed to inheriting it).
 *
 * @param target The object in which to look for the property.
 * @param property The name of the property to check.
 * @return True in case has own property; false otherwise.
 * @throws TypeError in case of target type violation.
 */
export function hasOwnProperty(target: object, property: PropertyKey): boolean {
  if (isObject(target)) return Object.hasOwnProperty.call(target, property);
  else throw new TypeError('Existence of the own property can be checked only at the object');
}
