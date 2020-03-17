/// <reference types="reflect-metadata" />
import isObject from 'lodash/isObject';
import { hasOwnMetadata } from './hasOwnMetadata';
import { getProtoOf } from './fallback/proto';
import { getFromStorage } from './fallback/get';

/* istanbul ignore next */
const builtInReflect: any = Reflect?.getMetadata;

/**
 * Reflect retrieves metadata by key from map related to the object or property
 * with additional checking on prototype chain. Fallback get the metadata from
 * private storage defined directly on the object or its prototype chain. Reflect
 * and Fallback is aligned to get prototype chain in same way. Fallback approach
 * have limitation to check metadata existence on non-object target.
 */
const _getMetadata: (key: any, target: object, property?: PropertyKey) => any | undefined =
  builtInReflect ??
  function getMetadataFk(key: any, target: object, property?: PropertyKey): any | undefined {
    return isObject(target)
      ? hasOwnMetadata(key, target, property)
        ? getFromStorage(key, target, property)
        : _getMetadata(key, getProtoOf(target), property)
      : undefined;
  };

/**
 * Get the metadata associated with object or its prototype chain.
 *
 * @param key Key used to retrieve metadata.
 * @param target Object associated with metadata.
 * @return Metadata for the key when found; undefined otherwise.
 */
export function getMetadata(key: any, target: object): any;

/**
 * Get the metadata associated with property or its prototype chain.
 *
 * @param key Key used to retrieve metadata.
 * @param target Object which contains property.
 * @param property Property associated with metadata.
 * @return Metadata for the key when found; undefined otherwise.
 */
export function getMetadata(key: any, target: object, property: PropertyKey): any;
export function getMetadata(key: any, target: object, property?: PropertyKey): any {
  return _getMetadata(key, target, property);
}
