import isUndefined from 'lodash/isUndefined';
import { getStorage, Storage } from './storage';

/**
 * Custom logic to determine whether the metadata defined on the `target`
 * storage.
 *
 * @param key The key used to retrieve metadata.
 * @param target The object on which the metadata is defined.
 * @return True in case the metadata defined; false otherwise.
 */
export function hasInStorage(key: any, target: object): boolean;

/**
 * Custom logic to determine whether the metadata defined on the `target`
 * and `property` storage.
 *
 * @param key The key used to retrieve metadata.
 * @param target The object on which the metadata is defined.
 * @param property The property to be associated with metadata.
 * @return True in case the metadata defined; false otherwise.
 */
export function hasInStorage(key: any, target: object, property: PropertyKey): boolean;
export function hasInStorage(key: any, target: object, property?: PropertyKey): boolean {
  // Get the existing storage from the `target`.
  const storage: Storage | undefined = getStorage(target);

  // Determine whether the metadata is defined.
  return storage
    ? isUndefined(property)
      ? Object.hasOwnProperty.call(storage.root, key)
      : !isUndefined(storage.prop[property]) && Object.hasOwnProperty.call(storage.prop[property], key)
    : false;
}
