import isUndefined from 'lodash/isUndefined';
import { deleteProperty } from '../deleteProperty';
import { getStorage, Storage } from './storage';

/**
 * Custom logic to delete the metadata from the object.
 * Not included any metadata existence checking as its done on higher level
 * with appropriate handling.
 *
 * @param key Key used to find and remove metadata.
 * @param target Object from which to remove metadata.
 * @return True in case the metadata has been found and deleted; false otherwise.
 */
export function deleteFromStorage(key: any, target: object): boolean;

/**
 * Custom logic to delete the metadata associated with property from the object.
 * Not included any metadata existence checking as its done on higher level
 * with appropriate handling.
 *
 * @param key Key used to find and remove metadata.
 * @param target Object from which to remove metadata.
 * @param property Property associated with metadata.
 * @return True in case the metadata has been found and deleted; false otherwise.
 */
export function deleteFromStorage(key: any, target: object, property: PropertyKey): boolean;
export function deleteFromStorage(key: any, target: object, property?: PropertyKey): boolean {
  // Get existing storage from the object.
  const storage: Storage = getStorage(target);

  // Delete the metadata from the storage.
  return isUndefined(property)
    ? deleteProperty(storage.root, key)
    : !isUndefined(storage.prop[property]) && deleteProperty(storage.prop[property], key);
}
