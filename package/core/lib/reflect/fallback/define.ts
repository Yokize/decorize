import isUndefined from 'lodash/isUndefined';
import { getOrCreateStorage, Storage } from './storage';

/**
 * Custom logic to define the metadata on the `target` storage.
 *
 * @param key The key used to store metadata.
 * @param value The value that contains metadata.
 * @param target The object on which to define metadata.
 */
export function defineInStorage(key: any, value: any, target: object): void;

/**
 * Custom logic to define the metadata on the `target` and `property` storage.
 *
 * @param key The key used to store metadata.
 * @param value The value that contains metadata.
 * @param target The object on which to define metadata.
 * @param property The property to be associated with metadata.
 */
export function defineInStorage(key: any, value: any, target: object, property: PropertyKey): void;
export function defineInStorage(key: any, value: any, target: object, property?: PropertyKey): void {
  // Create new or get the existing storage from the `target`.
  const storage: Storage = getOrCreateStorage(target);

  // Determine where and how to store the value.
  isUndefined(property)
    ? (storage.root[key] = value)
    : isUndefined(storage.prop[property])
    ? (storage.prop[property] = { [key]: value })
    : (storage.prop[property][key] = value);
}
