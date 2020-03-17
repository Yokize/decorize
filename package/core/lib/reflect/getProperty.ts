import isObject from 'lodash/isObject';

/* istanbul ignore next */
const builtInReflect: any = Reflect?.get;

/**
 * Reflect function works like getting a property from the object.
 */
const _getProperty: (target: object, property: PropertyKey) => any =
  builtInReflect ??
  function getPropertyFk(target: object, property: PropertyKey): any {
    // Verify whether target is object.
    if (isObject(target))
      // Get from object or prototype chain.
      return target[property];
    else throw new TypeError('Property can be retrieved only from the object');
  };

/**
 * Get value under the property from the object or its prototype chain.
 *
 * @param target Object in which to look for the property.
 * @param property Name of the property to find.
 * @return Retrieved property value; undefined otherwise.
 */
export function getProperty(target: object, property: PropertyKey): any {
  return _getProperty(target, property);
}
