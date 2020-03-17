import isObject from 'lodash/isObject';

/* istanbul ignore next */
const builtInReflect: any = Reflect?.ownKeys;

/**
 * Reflect already include extracting of own symbol keys from the object. Fallback
 * behave the same as Reflect and in case the Symbol is not supported get only own
 * string keys. Exceptional case is aligned and violation of target type throws
 * a TypeError.
 */
const _getOwnKeys: (target: object) => PropertyKey[] =
  builtInReflect ?? Object.getOwnPropertySymbols
    ? function getOwnKeysWithSymbolsFk(target: object): PropertyKey[] {
        if (isObject(target))
          // Use built-in helpers to get own properties and symbols.
          return [...Object.getOwnPropertyNames(target), ...Object.getOwnPropertySymbols(target)];
        else throw new TypeError('Own keys with symbols can be retrieved only from the object');
      }
    : function getOwnKeysWithoutSymbolsFk(target: object): PropertyKey[] {
        if (isObject(target))
          // Use built-in helper to get own properties.
          return Object.getOwnPropertyNames(target);
        else throw new TypeError('Own keys without symbols can be retrieved only from the object');
      };

/**
 * Get the names and symbols of the object's own properties.
 *
 * @param target Object from which to get own keys.
 * @return Names or symbols of the own properties of an object.
 * @throws TypeError in case of non-object target.
 */
export function getOwnKeys(target: object): PropertyKey[] {
  return _getOwnKeys(target);
}
