import isFunction from 'lodash/isFunction';
import { Global } from './global';
import { CacheConfig } from './cache';

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
