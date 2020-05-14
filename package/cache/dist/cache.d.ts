import { Resolver } from './resolver';
import { CacheEntry } from './global';
/**
 * Unique decorator ID.
 */
export declare const uniqueId: string;
/**
 * The interface describes the structure of the decorator configuration,
 * which defines how the caching process should be done. The configuration
 * specify the maximum age (ms) of the cached result, argument-dependent
 * key resolver and expiration manual logic.
 */
export interface CacheConfig {
    maxAge?: number;
    resolver?: Resolver;
    expire?: (entry: CacheEntry, context: any) => boolean | void;
}
/**
 * Check the expiration of the cache entry by comparing max age against
 * current date or executing manual expire logic. In case entry is expired
 * its directly removed from the cache.
 *
 * @param target Class (prototype).
 * @param property Property name.
 * @param cacheKey Cache key.
 * @param cacheConfig Cache config.
 */
export declare function checkExpiration(target: object, property: PropertyKey, cacheKey: any, cacheConfig: CacheConfig): void;
/**
 * Throw error in case the decorator used incorrectly.
 */
export declare function throwUsageError(): never;
