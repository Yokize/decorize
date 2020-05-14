import isFunction from 'lodash/isFunction';
import { Resolver } from './resolver';
import { CacheEntry, Global } from './global';

/**
 * Unique decorator ID.
 */
export const uniqueId: string = 'decorize:@cache';

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
export function checkExpiration(target: object, property: PropertyKey, cacheKey: any, cacheConfig: CacheConfig): void {
  // In case maxAge is specified, the expiration must be checked.
  if (cacheConfig?.maxAge >= 0 && Global.has(target, property, cacheKey))
    if (Global.get(target, property, cacheKey).timestamp + cacheConfig.maxAge <= Date.now())
      Global.remove(target, property, cacheKey);

  // In case manual logic is specified, the expiration must be checked.
  if (isFunction(cacheConfig?.expire) && Global.has(target, property, cacheKey))
    if (cacheConfig.expire.call(target, Global.get(target, property, cacheKey), target))
      Global.remove(target, property, cacheKey);
}

/**
 * Throw error in case the decorator used incorrectly.
 */
export function throwUsageError(): never {
  throw new Error(`${uniqueId} must be applied to method or getter`);
}
