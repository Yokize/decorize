import isObject from 'lodash/isObject';
import { getProperty } from './getProperty';
import { hasOwnProperty } from './hasOwnProperty';

/**
 * Get value under own property from the object.
 *
 * @param target Object in which to look for the property.
 * @param property Name of the property to find.
 * @return Retrieved property value; undefined otherwise.
 * @throws TypeError in case of non-object target.
 */
export function getOwnProperty(target: object, property: PropertyKey): any {
  // Verify whether target is object.
  if (isObject(target))
    // Get only in case it's defined directly on object.
    return hasOwnProperty(target, property) ? getProperty(target, property) : undefined;
  else throw new TypeError('Own property can be retrieved only from the object');
}
