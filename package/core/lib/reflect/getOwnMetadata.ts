/// <reference types="reflect-metadata" />
import isObject from 'lodash/isObject';
import { hasOwnMetadata } from './hasOwnMetadata';
import { getFromStorage } from './fallback/get';

/* istanbul ignore next */
const builtInReflect: any = Reflect?.getOwnMetadata;

/**
 * Reflect retrieves metadata by key from map related to the object or property.
 * Fallback get metadata from private storage defined directly at the object.
 * Fallback approach have limitation to get metadata from non-object target.
 */
const _getOwnMetadata: (key: any, target: object, property?: PropertyKey) => any | undefined =
  builtInReflect ??
  function getOwnMetadataFk(key: any, target: object, property?: PropertyKey): any | undefined {
    return isObject(target)
      ? hasOwnMetadata(key, target, property)
        ? getFromStorage(key, target, property)
        : undefined
      : undefined;
  };

/**
 * Get the metadata associated with object.
 *
 * @param key Key used to retrieve metadata.
 * @param target Object associated with metadata.
 * @return Metadata for the key when found; undefined otherwise.
 */
export function getOwnMetadata(key: any, target: object): any;

/**
 * Get the metadata associated with property.
 *
 * @param key Key used to retrieve metadata.
 * @param target Object which contains property.
 * @param property Property associated with metadata.
 * @return Metadata for the key when found; undefined otherwise.
 */
export function getOwnMetadata(key: any, target: object, property: PropertyKey): any;
export function getOwnMetadata(key: any, target: object, property?: PropertyKey): any {
  return _getOwnMetadata(key, target, property);
}
