import isObject from 'lodash/isObject';

/**
 * Get the value under own `property` from the `target`.
 *
 * @param target The object in which to look for the property.
 * @param property The name of the property used to look up.
 * @return The retrieved value; undefined otherwise.
 * @throws TypeError in case of target type violation.
 */
export function getOwnProperty(target: object, property: PropertyKey): any {
  if (isObject(target)) return Object.hasOwnProperty.call(target, property) ? target[property] : undefined;
  else throw new TypeError('Own property can be retrieved only from the object');
}
