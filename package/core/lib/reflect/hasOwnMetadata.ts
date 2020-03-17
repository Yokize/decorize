/// <reference types="reflect-metadata" />
import isObject from 'lodash/isObject';
import { hasInStorage } from './fallback/has';

/* istanbul ignore next */
const builtInReflect: any = Reflect?.hasOwnMetadata;

/**
 * Reflect check existence of key at map related to object and property. Fallback
 * is checking whether the key is defined at private storage directly on the object.
 * Fallback approach have limitation to check metadata existence on non-object target.
 */
const _hasOwnMetadata: (key: any, target: object, property?: PropertyKey) => boolean =
  builtInReflect ??
  function hasOwnMetadataFk(key: any, target: object, property?: PropertyKey): boolean {
    return isObject(target) ? hasInStorage(key, target, property) : false;
  };

/**
 * Determine whether the metadata associated with object is defined.
 *
 * @param key Key used to store and retrieve metadata.
 * @param target Object associated with metadata.
 * @return True in case the metadata defined; false otherwise.
 */
export function hasOwnMetadata(key: any, target: object): boolean;

/**
 * Determine whether the metadata associated with property is defined.
 *
 * @param key Key used to store and retrieve metadata.
 * @param target Object which contains property.
 * @param property Property associated with metadata.
 * @return True in case the metadata defined; false otherwise.
 */
export function hasOwnMetadata(key: any, target: object, property: PropertyKey): boolean;
export function hasOwnMetadata(key: any, target: object, property?: PropertyKey): boolean {
  return _hasOwnMetadata(key, target, property);
}
