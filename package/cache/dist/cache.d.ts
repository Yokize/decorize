import { Resolver } from './resolver';
/**
 * Get unique identifier of the decorator.
 */
export declare function getDecoratorId(): string;
/**
 * Structure of the cache config.
 */
export interface CacheConfig {
    /**
     * Max age (ms).
     */
    maxAge?: number;
    /**
     * Create key based on the args.
     */
    resolver?: Resolver;
    /**
     * Manual logic to expire the cache.
     */
    expire?: (entry: CacheEntry, context: any) => boolean | void;
}
/**
 * Structure of the cache entry.
 */
export interface CacheEntry {
    /**
     * Result.
     */
    value: any;
    /**
     * Max age (ms).
     */
    maxAge?: number;
    /**
     * Timestamp when entry is added (ms).
     */
    timestamp: number;
}
/**
 * Check the expiration of the cache.
 *
 * @param target Class (prototype).
 * @param property Property name.
 * @param cacheKey Cache key.
 * @param cacheConfig Configuration.
 */
export declare function checkExpiration(target: object, property: PropertyKey, cacheKey: any, cacheConfig: CacheConfig): void;
/**
 * Throw error in case the decorator used incorrectly.
 */
export declare function throwIncorrectUsage(): never;
