/// <reference types="reflect-metadata" />
import isObject from 'lodash/isObject';
import { hasInStorage } from './fallback/has';

/* istanbul ignore next */
const ReflectBuiltIn: any = Reflect?.hasOwnMetadata;

/**
 * Reflect checks the existence of the key at the map, which relates to the `target` or
 * its `property`. The fallback implementation checks whether the key is in the private
 * storage, which defined directly on the `target`. The fallback approach has limitations
 * to check metadata existence on a non-object `target`.
 */
const _hasOwnMetadata: (key: any, target: object, property?: PropertyKey) => boolean =
  ReflectBuiltIn ??
  function hasOwnMetadataFk(key: any, target: object, property?: PropertyKey): boolean {
    return isObject(target) ? hasInStorage(key, target, property) : false;
  };

/**
 * Determine whether the metadata associated with the `target` is defined.
 *
 * @param key The key used to retrieve metadata.
 * @param target The object associated with metadata.
 * @return True in case the metadata defined; false otherwise.
 */
export function hasOwnMetadata(key: any, target: object): boolean;

/**
 * Determine whether the metadata associated with the `target` and `property`
 * is defined.
 *
 * @param key The key used to retrieve metadata.
 * @param target The object associated with metadata.
 * @param property The property associated with metadata.
 * @return True in case the metadata defined; false otherwise.
 */
export function hasOwnMetadata(key: any, target: object, property: PropertyKey): boolean;
export function hasOwnMetadata(key: any, target: object, property?: PropertyKey): boolean {
  return _hasOwnMetadata(key, target, property);
}
