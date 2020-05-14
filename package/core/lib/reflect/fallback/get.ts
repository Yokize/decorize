import isUndefined from 'lodash/isUndefined';
import { getStorage, Storage } from './storage';

/**
 * Custom logic to get the metadata from the `target` storage.
 * Does not include checking for the existence of metadata as this is done
 * at the higher level with appropriate processing.
 *
 * @param key The key used to retrieve metadata.
 * @param target The object on which the metadata is defined.
 * @return Metadata under the key in case its found; undefined otherwise.
 */
export function getFromStorage(key: any, target: object): any;

/**
 * Custom logic to get the metadata from the `target` and `property` storage.
 * Does not include checking for the existence of metadata as this is done
 * at the higher level with appropriate processing.
 *
 * @param key The key used to retrieve metadata.
 * @param target The object on which the metadata is defined.
 * @param property The property to be associated with metadata.
 * @return Metadata under the key in case its found; undefined otherwise.
 */
export function getFromStorage(key: any, target: object, property: PropertyKey): any;
export function getFromStorage(key: any, target: object, property?: PropertyKey): any {
  // Get the existing storage from the `target`.
  const storage: Storage = getStorage(target);

  // Get the metadata from the storage.
  return isUndefined(property) ? storage.root[key] : storage.prop[property] && storage.prop[property][key];
}
