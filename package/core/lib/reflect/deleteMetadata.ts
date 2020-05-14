/// <reference types="reflect-metadata" />
import isObject from 'lodash/isObject';
import { hasOwnMetadata } from './hasOwnMetadata';
import { deleteFromStorage } from './fallback/delete';

/* istanbul ignore next */
const ReflectBuiltIn: any = Reflect?.deleteMetadata;

/**
 * Reflect and Fallback removes corresponding metadata by the specified key and return
 * status whether metadata have been found and successfully removed. Reflect removes
 * metadata from the map, which relates to the `target` or its `property`. The fallback
 * implementation removes metadata from the private storage, which defined directly on
 * the `target`.
 */
const _deleteMetadata: (key: any, target: object, property?: PropertyKey) => boolean =
  ReflectBuiltIn ??
  function deleteMetadataFk(key: any, target: object, property?: PropertyKey): boolean {
    if (isObject(target))
      return hasOwnMetadata(key, target, property) ? deleteFromStorage(key, target, property) : false;
    else throw new TypeError('Metadata can be deleted only from the object');
  };

/**
 * Delete the metadata associated with the `target`.
 *
 * @param key The key used to retrieve metadata.
 * @param target The object associated with metadata.
 * @return True in case the metadata has been found and deleted; false otherwise.
 * @throws TypeError in case of target type violation.
 */
export function deleteMetadata(key: any, target: object): boolean;

/**
 * Delete the metadata associated with the `target` and `property`.
 *
 * @param key The key used to retrieve metadata.
 * @param target The object associated with metadata.
 * @param property The property associated with metadata.
 * @return True in case the metadata has been found and deleted; false otherwise.
 * @throws TypeError in case of target type violation.
 */
export function deleteMetadata(key: any, target: object, property: PropertyKey): boolean;
export function deleteMetadata(key: any, target: object, property?: PropertyKey): boolean {
  return _deleteMetadata(key, target, property);
}
