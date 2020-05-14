/// <reference types="reflect-metadata" />
import isObject from 'lodash/isObject';
import { hasOwnMetadata } from './hasOwnMetadata';
import { getProtoOf } from './fallback/proto';
import { getFromStorage } from './fallback/get';

/* istanbul ignore next */
const ReflectBuiltIn: any = Reflect?.getMetadata;

/**
 * Reflect retrieves metadata by the key from the map, which relates to the `target`
 * or its `property` with additional checking on the prototype chain. The fallback
 * implementation retrieves metadata from the private storage, which defined directly
 * on the `target` or its prototype chain. Reflect and Fallback is aligned to get
 * prototype chain in same way.
 */
const _getMetadata: (key: any, target: object, property?: PropertyKey) => any | undefined =
  ReflectBuiltIn ??
  function getMetadataFk(key: any, target: object, property?: PropertyKey): any | undefined {
    return isObject(target)
      ? hasOwnMetadata(key, target, property)
        ? getFromStorage(key, target, property)
        : _getMetadata(key, getProtoOf(target), property)
      : undefined;
  };

/**
 * Get the metadata associated with `target` or its prototype chain.
 *
 * @param key The key used to retrieve metadata.
 * @param target The object associated with metadata.
 * @return Metadata for the key when found; undefined otherwise.
 * @throws TypeError in case of target type violation.
 */
export function getMetadata(key: any, target: object): any;

/**
 * Get the metadata associated with `target` and `property` or its
 * prototype chain.
 *
 * @param key The key used to retrieve metadata.
 * @param target The object associated with metadata.
 * @param property The property associated with metadata.
 * @return Metadata for the key when found; undefined otherwise.
 * @throws TypeError in case of target type violation.
 */
export function getMetadata(key: any, target: object, property: PropertyKey): any;
export function getMetadata(key: any, target: object, property?: PropertyKey): any {
  return _getMetadata(key, target, property);
}
