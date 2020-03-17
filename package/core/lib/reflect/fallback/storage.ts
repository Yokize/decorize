import { getOwnProperty } from '../getOwnProperty';
import { defineProperty } from '../defineProperty';
import { hasOwnProperty } from '../hasOwnProperty';

/**
 * Unique storage key.
 */
/* istanbul ignore next */
const _storageKey: symbol | string = Symbol
  ? // Private symbol.
    Symbol.for('Decorize: Reflect')
  : // Namespaced key.
    '__decorize::reflect__';

/**
 * Structure of storage which segmented to store metadata
 * at the object or property.
 */
export interface Storage {
  root: any;
  prop: any;
}

/**
 * Create storage and assign it directly to the object.
 *
 * @param target Object to which assign storage.
 * @return Created and assigned storage.
 */
export function createStorage(target: object): Storage {
  // Newly created storage.
  const storage: Storage = { root: {}, prop: {} };

  // Define as non configurable internal property.
  defineProperty(target, _storageKey, { value: storage });

  // Newly assigned storage.
  return storage;
}

/**
 * Determine whether storage directly defined on the object.
 *
 * @param target Object on which to check storage existence.
 * @return True in case storage defined; false otherwise.
 */
export function hasStorage(target: object): boolean {
  return hasOwnProperty(target, _storageKey);
}

/**
 * Get storage which directly defined on the object.
 *
 * @param target Object from which to get storage.
 * @return Storage; null in case non exist.
 */
export function getStorage(target: object): Storage | undefined {
  return hasStorage(target) ? getOwnProperty(target, _storageKey) : undefined;
}

/**
 * Get or create storage directly on the object.
 *
 * @param target Object which contains storage.
 * @return Storage defined at the object.
 */
export function getOrCreateStorage(target: object): Storage {
  return getStorage(target) ?? createStorage(target);
}
