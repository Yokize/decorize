import isObject from 'lodash/isObject';

/* istanbul ignore next */
const builtInReflect: any = Reflect?.getPrototypeOf;

/**
 * Reflect and Object built-in function returns the prototype of the object
 * (value of the internal [[Prototype]]). Exceptional case is aligned and
 * violation of target type throws a TypeError.
 */
const _getPrototypeOf: (target: object) => any | undefined =
  builtInReflect ??
  function getPrototypeOfFk(target: object): any | undefined {
    // Verify whether target is object.
    if (isObject(target))
      // Use built-in helper to get prototype.
      return Object.getPrototypeOf(target);
    else throw new TypeError('Prototype can be retrieved only from the object');
  };

/**
 * Get the prototype of the object.
 *
 * @param target Object referring to the prototype.
 * @return Prototype; null in case of missing prototype.
 * @throws TypeError in case of non-object target.
 */
export function getPrototypeOf(target: object): any | undefined {
  return _getPrototypeOf(target);
}
