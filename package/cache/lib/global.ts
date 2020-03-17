import isNil from 'lodash/isNil';
import isObject from 'lodash/isObject';
import { defineMetadata } from '@decorize/core/reflect/defineMetadata';
import { getOwnMetadata } from '@decorize/core/reflect/getOwnMetadata';
import { hasOwnProperty } from '@decorize/core/reflect/hasOwnProperty';
import { getOwnProperty } from '@decorize/core/reflect/getOwnProperty';
import { deleteMetadata } from '@decorize/core/reflect/deleteMetadata';
import { deleteProperty } from '@decorize/core/reflect/deleteProperty';
import { resolver } from './resolver';

/* istanbul ignore next */
const _globalKey: string | symbol = Symbol
  ? // Private symbol.
    Symbol.for('Decorize: Cache')
  : // Namespaced key.
    '__decorize::cache__';

/**
 * Determine whether there is an entry.
 *
 * @param target Class (prototype).
 * @param property Property name.
 * @param key Key used to store and retrieve the entry.
 * @return True in case the entry is stored; false otherwise.
 */
function has(target: object, property: PropertyKey, key: any): boolean {
  // Get the cache linked to the target.
  const cache: any = getOwnMetadata(_globalKey, target);

  // Ensure the cache exist and has the entry associated with the key.
  return isObject(cache?.[property]) ? hasOwnProperty(cache[property], key) : false;
}

/**
 * Get the entry from the cache.
 *
 * @param target Class (prototype).
 * @param property Property name.
 * @param key Key used to retrieve the entry.
 * @return Stored entry; undefined otherwise.
 */
function get(target: object, property: PropertyKey, key: any): any | undefined {
  // Get the cache linked to the target.
  const cache: any = getOwnMetadata(_globalKey, target);

  // Ensure the cache exist and retrieve the entry associated with the key.
  return isObject(cache?.[property]) ? getOwnProperty(cache[property], key) : undefined;
}

/**
 * Set the entry to the cache.
 *
 * @param target Class (prototype).
 * @param property Property name.
 * @param key Key used to store entry.
 * @param entry Entry to store.
 */
function set(target: object, property: PropertyKey, key: any, entry: any): void {
  // Get the cache linked to the target.
  let cache: any = getOwnMetadata(_globalKey, target);

  // Defaulting general cache.
  if (isNil(cache)) cache = {};

  // Defaulting property cache.
  if (isNil(cache[property])) cache[property] = {};

  // Assign the entry under the key.
  cache[property][key] = entry;

  // Link the cache to the target.
  defineMetadata(_globalKey, cache, target);
}

/**
 * Remove the entry from the cache.
 *
 * @param target Class (prototype).
 * @param property Property name.
 * @param key Key used to store and retrieve the entry.
 */
function remove(target: object, property: PropertyKey, key: any): void {
  // Get the cache linked to the target.
  const cache: any = getOwnMetadata(_globalKey, target);

  // Ensure the cache exist and remove the entry associated with the key.
  if (isObject(cache?.[property])) deleteProperty(cache[property], key);
}

/**
 * Clear the whole or property cache.
 *
 * @param target Class (prototype).
 * @param property Property name.
 */
function clear(target: any, property?: PropertyKey): void {
  // Get the cache linked to the target.
  const cache: any = getOwnMetadata(_globalKey, target);

  // Remove the cache in case it's exists.
  isNil(property)
    ? // Remove the whole cache.
      deleteMetadata(_globalKey, target)
    : // Remove the property cache.
      isObject(cache?.[property]) && deleteProperty(cache, property);
}

/**
 * Global cache manager used by decorators.
 */
export const Global = { resolver, has, get, set, remove, clear };
