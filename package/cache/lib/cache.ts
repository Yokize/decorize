import isFunction from 'lodash/isFunction';
import { Global } from './global';
import { Resolver } from './resolver';

/**
 * Get unique identifier of the decorator.
 */
export function getDecoratorId(): string {
  return 'decorize:@cache';
}

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
export function checkExpiration(target: object, property: PropertyKey, cacheKey: any, cacheConfig: CacheConfig): void {
  // In case maxAge specified need to check the expiration.
  if (cacheConfig?.maxAge >= 0 && Global.has(target, property, cacheKey))
    if (Global.get(target, property, cacheKey).timestamp + cacheConfig.maxAge <= Date.now())
      Global.remove(target, property, cacheKey);

  // In case manual logic specified need to check the expiration.
  if (isFunction(cacheConfig?.expire) && Global.has(target, property, cacheKey))
    if (cacheConfig.expire.call(target, Global.get(target, property, cacheKey), target))
      Global.remove(target, property, cacheKey);
}

/**
 * Throw error in case the decorator used incorrectly.
 */
export function throwIncorrectUsage(): never {
  throw new Error(`${getDecoratorId()} must be applied to method or getter`);
}
