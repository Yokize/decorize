import isUndefined from 'lodash/isUndefined';
import { deleteProperty } from '../deleteProperty';
import { getStorage, Storage } from './storage';

/**
 * Custom logic to delete the metadata from the `target` storage.
 * Does not include checking for the existence of metadata as this is done
 * at the higher level with appropriate processing.
 *
 * @param key The key used to find and remove metadata.
 * @param target The object from which to remove metadata.
 * @return True in case the metadata has been found and deleted; false otherwise.
 */
export function deleteFromStorage(key: any, target: object): boolean;

/**
 * Custom logic to delete the metadata from the `target` and `property` storage.
 * Does not include checking for the existence of metadata as this is done
 * at the higher level with appropriate processing.
 *
 * @param key The key used to find and remove metadata.
 * @param target The object from which to remove metadata.
 * @param property The property to be associated with metadata.
 * @return True in case the metadata has been found and deleted; false otherwise.
 */
export function deleteFromStorage(key: any, target: object, property: PropertyKey): boolean;
export function deleteFromStorage(key: any, target: object, property?: PropertyKey): boolean {
  // Get the existing storage from the `target`.
  const storage: Storage = getStorage(target);

  // Delete the metadata from the storage.
  return isUndefined(property)
    ? deleteProperty(storage.root, key)
    : !isUndefined(storage.prop[property]) && deleteProperty(storage.prop[property], key);
}
