import isUndefined from 'lodash/isUndefined';
import { getOrCreateStorage, Storage } from './storage';

/**
 * Custom logic to define the metadata on the object.
 *
 * @param key Key used to store and retrieve metadata.
 * @param value Value which contains metadata.
 * @param target Object on which to define metadata.
 */
export function defineInStorage(key: any, value: any, target: object): void;

/**
 * Custom logic to define the metadata associated with property on the object.
 *
 * @param key Key used to store and retrieve metadata.
 * @param value Value which contains metadata.
 * @param target Object on which to define metadata.
 * @param property Property to be associated with metadata.
 */
export function defineInStorage(key: any, value: any, target: object, property: PropertyKey): void;
export function defineInStorage(key: any, value: any, target: object, property?: PropertyKey): void {
  // Create new or get existing storage from the target object.
  const storage: Storage = getOrCreateStorage(target);

  // Determine where to store value.
  isUndefined(property)
    ? (storage.root[key] = value)
    : isUndefined(storage.prop[property])
    ? (storage.prop[property] = { [key]: value })
    : (storage.prop[property][key] = value);
}
