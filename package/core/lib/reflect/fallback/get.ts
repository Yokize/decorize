import isUndefined from 'lodash/isUndefined';
import { getStorage, Storage } from './storage';

/**
 * Custom logic to get the metadata from the object.
 * Not included any metadata existence checking as its done on higher level
 * with appropriate handling.
 *
 * @param key Key used to retrieve metadata.
 * @param target Object on which the metadata is defined.
 * @return Metadata for the key in case its found; undefined otherwise.
 */
export function getFromStorage(key: any, target: object): any;

/**
 * Custom logic to get the metadata associated with property from the object.
 * Not included any metadata existence checking as its done on higher level
 * with appropriate handling.
 *
 * @param key Key used to retrieve metadata.
 * @param target Object on which the metadata is defined.
 * @param property Property associated with metadata.
 * @return Metadata for the key in case its found; undefined otherwise.
 */
export function getFromStorage(key: any, target: object, property: PropertyKey): any;
export function getFromStorage(key: any, target: object, property?: PropertyKey): any {
  // Get existing storage from the object.
  const storage: Storage = getStorage(target);

  // Get metadata from the storage.
  return isUndefined(property) ? storage.root[key] : storage.prop[property] && storage.prop[property][key];
}
