import { getOwnProperty } from '../getOwnProperty';

/* istanbul ignore next */
const _storageKey: symbol | string = Symbol
  ? // Private symbol.
    Symbol.for('Decorize: Reflect')
  : // Namespaced key.
    '__decorize::reflect__';

/**
 * The interface describes the structure of the storage, which
 * segmented to store metadata at the object or property.
 */
export interface Storage {
  root: any;
  prop: any;
}

/**
 * Create the storage and assign it directly to the object.
 *
 * @param target The object to which the storage should be assigned.
 * @return The storage is created and assigned to the object.
 */
export function createStorage(target: object): Storage {
  // Newly created storage.
  const storage: Storage = { root: {}, prop: {} };

  // Define as non configurable internal property.
  Object.defineProperty(target, _storageKey, {
    value: storage
  });

  // Newly assigned storage.
  return storage;
}

/**
 * Get the storage which directly defined on the object.
 *
 * @param target The object from which to get the storage.
 * @return The storage; null in case non exist.
 */
export function getStorage(target: object): Storage | undefined {
  return getOwnProperty(target, _storageKey);
}

/**
 * Get or create the storage directly on the object.
 *
 * @param target The object from which to get the storage.
 * @return The storage defined at the object.
 */
export function getOrCreateStorage(target: object): Storage {
  return getStorage(target) ?? createStorage(target);
}
