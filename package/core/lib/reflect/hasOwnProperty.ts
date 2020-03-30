import isObject from 'lodash/isObject';

/**
 * Determine whether an object has own property (opposed to inheriting it).
 *
 * @param target Object in which to look for the property.
 * @param property Name of the property to check.
 * @return True in case has own property; false otherwise.
 */
export function hasOwnProperty(target: object, property: PropertyKey): boolean {
  // Verify whether target is object.
  if (isObject(target))
    // Check whether own property descriptor exist.
    return Object.hasOwnProperty.call(target, property);
  else throw new TypeError('Existence of the own property can be checked only on the object');
}
