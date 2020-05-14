/// <reference types="reflect-metadata" />
import isObject from 'lodash/isObject';
import { hasOwnMetadata } from './hasOwnMetadata';
import { getFromStorage } from './fallback/get';

/* istanbul ignore next */
const ReflectBuiltIn: any = Reflect?.getOwnMetadata;

/**
 * Reflect retrieves metadata by the key from the map, which relates to the `target`
 * or its `property`. The fallback implementation retrieves metadata from the private
 * storage, which defined directly on the `target`.
 */
const _getOwnMetadata: (key: any, target: object, property?: PropertyKey) => any | undefined =
  ReflectBuiltIn ??
  function getOwnMetadataFk(key: any, target: object, property?: PropertyKey): any | undefined {
    return isObject(target)
      ? hasOwnMetadata(key, target, property)
        ? getFromStorage(key, target, property)
        : undefined
      : undefined;
  };

/**
 * Get the metadata associated with `target`.
 *
 * @param key The key used to retrieve metadata.
 * @param target The object associated with metadata.
 * @return Metadata for the key when found; undefined otherwise.
 */
export function getOwnMetadata(key: any, target: object): any;

/**
 * Get the metadata associated with `target` and `property`.
 *
 * @param key The key used to retrieve metadata.
 * @param target The object associated with metadata.
 * @param property The property associated with metadata.
 * @return Metadata for the key when found; undefined otherwise.
 */
export function getOwnMetadata(key: any, target: object, property: PropertyKey): any;
export function getOwnMetadata(key: any, target: object, property?: PropertyKey): any {
  return _getOwnMetadata(key, target, property);
}
