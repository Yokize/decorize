import isObject from 'lodash/isObject';

/* istanbul ignore next */
const ReflectBuiltIn: any = Reflect?.getPrototypeOf;

/**
 * Reflect and Object built-in function returns the prototype of the `target`
 * (value of the internal [[Prototype]]).
 */
const _getPrototypeOf: (target: object) => any | undefined =
  ReflectBuiltIn ??
  function getPrototypeOfFk(target: object): any | undefined {
    if (isObject(target)) return Object.getPrototypeOf(target);
    else throw new TypeError('Prototype can be retrieved only from the object');
  };

/**
 * Get the prototype of the `target`.
 *
 * @param target The object referring to the prototype.
 * @return Prototype; null in case of missing prototype.
 * @throws TypeError in case of target type violation.
 */
export function getPrototypeOf(target: object): any | undefined {
  return _getPrototypeOf(target);
}
