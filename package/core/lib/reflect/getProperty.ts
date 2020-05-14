import isObject from 'lodash/isObject';

/* istanbul ignore next */
const ReflectBuiltIn: any = Reflect?.get;

/**
 * Reflect function works the same as directly accessing the `property`
 * from the `target`.
 */
const _getProperty: (target: object, property: PropertyKey) => any =
  ReflectBuiltIn ??
  function getPropertyFk(target: object, property: PropertyKey): any {
    if (isObject(target)) return target[property];
    else throw new TypeError('Property can be retrieved only from the object');
  };

/**
 * Get the value under the `property` from the `target` or its prototype chain.
 *
 * @param target The object in which to look for the property.
 * @param property The name of the property used to look up.
 * @return The retrieved value; undefined otherwise.
 * @throws TypeError in case of target type violation.
 */
export function getProperty(target: object, property: PropertyKey): any {
  return _getProperty(target, property);
}
