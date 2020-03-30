import isUndefined from 'lodash/isUndefined';
import { getStorage, Storage } from './storage';

/**
 * Custom logic to determine whether the metadata defined on the object.
 *
 * @param key Key used to store and retrieve metadata.
 * @param target Object on which the metadata is defined.
 * @return True in case the metadata defined; false otherwise.
 */
export function hasInStorage(key: any, target: object): boolean;

/**
 * Custom logic to determine whether the metadata associated with property
 * defined on the object.
 *
 * @param key Key used to store and retrieve metadata.
 * @param target Object on which the metadata is defined.
 * @param property Property associated with metadata.
 * @return True in case the metadata defined; false otherwise.
 */
export function hasInStorage(key: any, target: object, property: PropertyKey): boolean;
export function hasInStorage(key: any, target: object, property?: PropertyKey): boolean {
  // Get existing storage from the object.
  const storage: Storage | undefined = getStorage(target);

  // Determine whenever metadata defined.
  return storage
    ? isUndefined(property)
      ? Object.hasOwnProperty.call(storage.root, key)
      : !isUndefined(storage.prop[property]) && Object.hasOwnProperty.call(storage.prop[property], key)
    : false;
}
