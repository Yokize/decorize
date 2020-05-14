import isObject from 'lodash/isObject';

/* istanbul ignore next */
const ReflectBuiltIn: any = Reflect?.ownKeys;

/**
 * Reflect already include extracting of own symbol keys from the object. The fallback
 * implementation behaves the same as Reflect and in case the Symbol is not supported
 * get only own string keys.
 */
const _getOwnKeys: (target: object) => PropertyKey[] =
  ReflectBuiltIn ?? Object.getOwnPropertySymbols
    ? function getOwnKeysWithSymbolsFk(target: object): PropertyKey[] {
        if (isObject(target)) return [...Object.getOwnPropertyNames(target), ...Object.getOwnPropertySymbols(target)];
        else throw new TypeError('Own keys with symbols can be retrieved only from the object');
      }
    : function getOwnKeysWithoutSymbolsFk(target: object): PropertyKey[] {
        if (isObject(target)) return Object.getOwnPropertyNames(target);
        else throw new TypeError('Own keys without symbols can be retrieved only from the object');
      };

/**
 * Get the names and symbols of the `target` own properties.
 *
 * @param target The object from which to get own keys.
 * @return Names or symbols of the own properties of the object.
 * @throws TypeError in case of target type violation.
 */
export function getOwnKeys(target: object): PropertyKey[] {
  return _getOwnKeys(target);
}
