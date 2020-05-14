/**
 * The interface describes the basic structure of the cache entry,
 * which contains the result of the method or getter, the maximum
 * age (ms) and the date of its addition (ms).
 */
export interface CacheEntry {
    value: any;
    maxAge?: number;
    timestamp: number;
}
/**
 * Determine whether there's an entry in the cache.
 *
 * @param target Class (prototype).
 * @param property Property name.
 * @param key The key used to store and retrieve the entry.
 * @return True in case the entry is stored; false otherwise.
 */
declare function has(target: object, property: PropertyKey, key: any): boolean;
/**
 * Get the entry from the cache.
 *
 * @param target Class (prototype).
 * @param property Property name.
 * @param key The key used to retrieve the entry.
 * @return Stored entry; undefined otherwise.
 */
declare function get(target: object, property: PropertyKey, key: any): any;
/**
 * Set the entry to the cache.
 *
 * @param target Class (prototype).
 * @param property Property name.
 * @param key The key used to store entry.
 * @param entry Entry to be added to cache.
 */
declare function set(target: object, property: PropertyKey, key: any, entry: any): void;
/**
 * Remove the entry from the cache.
 *
 * @param target Class (prototype).
 * @param property Property name.
 * @param key The key used to retrieve the entry.
 */
declare function remove(target: object, property: PropertyKey, key: any): void;
/**
 * Clear the whole or property cache.
 *
 * @param target Class (prototype).
 * @param property Property name.
 */
declare function clear(target: any, property?: PropertyKey): void;
/**
 * The exposed and overridable helpers used by `@cache` and `@cacheClear`
 * decorators to manage cache.
 */
export declare const Global: {
    resolver: import("./resolver").Resolver;
    has: typeof has;
    get: typeof get;
    set: typeof set;
    remove: typeof remove;
    clear: typeof clear;
};
export {};
