/// <reference types="reflect-metadata" />
import isObject from 'lodash/isObject';
import { getProtoOf } from './fallback/proto';
import { hasInStorage } from './fallback/has';

/* istanbul ignore next */
const ReflectBuiltIn: any = Reflect?.hasMetadata;

/**
 * Reflect checks the existence of the key at the map, which relates to the `target` or its
 * `property` with additional checking on the prototype chain. The fallback implementation
 * checks whether the key is in the private storage, which defined directly on the `target`
 * or its prototype chain. Reflect and Fallback is aligned to get prototype chain in same way.
 * The fallback approach has limitations to check metadata existence on a non-object `target`.
 */
const _hasMetadata: (key: any, target: object, property?: PropertyKey) => boolean =
  ReflectBuiltIn ??
  function hasMetadataFk(key: any, target: object, property?: PropertyKey): boolean {
    return isObject(target)
      ? hasInStorage(key, target, property) || _hasMetadata(key, getProtoOf(target), property)
      : false;
  };

/**
 * Determine whether the metadata associated with the `target` or its
 * prototype chain is defined.
 *
 * @param key The key used to retrieve metadata.
 * @param target The object associated with metadata.
 * @return True in case the metadata defined; false otherwise.
 */
export function hasMetadata(key: any, target: object): boolean;

/**
 * Determine whether the metadata associated with the `target` and `property`
 * or its prototype chain is defined.
 *
 * @param key The key used to retrieve metadata.
 * @param target The object associated with metadata.
 * @param property The property associated with metadata.
 * @return True in case the metadata defined; false otherwise.
 */
export function hasMetadata(key: any, target: object, property: PropertyKey): boolean;
export function hasMetadata(key: any, target: object, property?: PropertyKey): boolean {
  return _hasMetadata(key, target, property);
}
