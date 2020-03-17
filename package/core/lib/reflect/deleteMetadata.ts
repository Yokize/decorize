/// <reference types="reflect-metadata" />
import isObject from 'lodash/isObject';
import { hasOwnMetadata } from './hasOwnMetadata';
import { deleteFromStorage } from './fallback/delete';

/* istanbul ignore next */
const builtInReflect: any = Reflect?.deleteMetadata;

/**
 * Reflect and Fallback removes corresponding metadata by specified key and return
 * status whether metadata have been found and successfully removed. Reflect removes
 * metadata from map defined for an object or property. Fallback removes metadata
 * from the storage defined on the object. Fallback approach have limitation to
 * delete metadata from non-object target.
 */
const _deleteMetadata: (key: any, target: object, property?: PropertyKey) => boolean =
  builtInReflect ??
  function deleteMetadataFk(key: any, target: object, property?: PropertyKey): boolean {
    // Verify whether target is object.
    if (isObject(target))
      // Delete metadata associated with target or property.
      return hasOwnMetadata(key, target, property) ? deleteFromStorage(key, target, property) : false;
    else throw new TypeError('Metadata can be deleted only from the object');
  };

/**
 * Delete the metadata associated with object.
 *
 * @param key Key used to find and remove metadata.
 * @param target Object associated with metadata.
 * @return True in case the metadata has been found and deleted; false otherwise.
 * @throws TypeError in case of non-object target.
 */
export function deleteMetadata(key: any, target: object): boolean;

/**
 * Delete the metadata associated with property.
 *
 * @param key Key used to find and remove metadata.
 * @param target Object which contains property.
 * @param property Property associated with metadata.
 * @return True in case the metadata has been found and deleted; false otherwise.
 * @throws TypeError in case of non-object target.
 */
export function deleteMetadata(key: any, target: object, property: PropertyKey): boolean;
export function deleteMetadata(key: any, target: object, property?: PropertyKey): boolean {
  return _deleteMetadata(key, target, property);
}
