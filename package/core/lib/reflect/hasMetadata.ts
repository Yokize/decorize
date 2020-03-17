/// <reference types="reflect-metadata" />
import isObject from 'lodash/isObject';
import { getProtoOf } from './fallback/proto';
import { hasInStorage } from './fallback/has';

/* istanbul ignore next */
const builtInReflect: any = Reflect?.hasMetadata;

/**
 * Reflect check existence of a key at map related to object or property with
 * additional checking at prototype chain. Fallback check whether key is defined
 * in private storage directly on the object or its prototype chain. Reflect and
 * Fallback is aligned to get prototype chain in same way. Fallback approach have
 * limitation to check metadata existence on non-object target.
 */
const _hasMetadata: (key: any, target: object, property?: PropertyKey) => boolean =
  builtInReflect ??
  function hasMetadataFk(key: any, target: object, property?: PropertyKey): boolean {
    return isObject(target)
      ? hasInStorage(key, target, property) || _hasMetadata(key, getProtoOf(target), property)
      : false;
  };

/**
 * Determine whether the metadata associated with object or its
 * prototype chain is defined.
 *
 * @param key Key used to store and retrieve metadata.
 * @param target Object associated with metadata.
 * @return True in case the metadata defined; false otherwise.
 */
export function hasMetadata(key: any, target: object): boolean;

/**
 * Determine whether the metadata associated with property or its
 * prototype chain is defined.
 *
 * @param key Key used to store and retrieve metadata.
 * @param target Object which contains property.
 * @param property Property associated with metadata.
 * @return True in case the metadata defined; false otherwise.
 */
export function hasMetadata(key: any, target: object, property: PropertyKey): boolean;
export function hasMetadata(key: any, target: object, property?: PropertyKey): boolean {
  return _hasMetadata(key, target, property);
}
