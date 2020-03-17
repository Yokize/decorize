/**
 * Determine whether there is an entry.
 *
 * @param target Class (prototype).
 * @param property Property name.
 * @param key Key used to store and retrieve the entry.
 * @return True in case the entry is stored; false otherwise.
 */
declare function has(target: object, property: PropertyKey, key: any): boolean;
/**
 * Get the entry from the cache.
 *
 * @param target Class (prototype).
 * @param property Property name.
 * @param key Key used to retrieve the entry.
 * @return Stored entry; undefined otherwise.
 */
declare function get(target: object, property: PropertyKey, key: any): any | undefined;
/**
 * Set the entry to the cache.
 *
 * @param target Class (prototype).
 * @param property Property name.
 * @param key Key used to store entry.
 * @param entry Entry to store.
 */
declare function set(target: object, property: PropertyKey, key: any, entry: any): void;
/**
 * Remove the entry from the cache.
 *
 * @param target Class (prototype).
 * @param property Property name.
 * @param key Key used to store and retrieve the entry.
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
 * Global cache manager used by decorators.
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
