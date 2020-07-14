import { Resolver } from './resolver';
import { CacheEntry } from './global';

/**
 * Unique decorator ID.
 */
export const uniqueId: string = 'decorize:@cache';

/**
 * The interface describes the structure of the decorator configuration,
 * which defines how the caching process should be done. The configuration
 * specify the maximum age (ms) of the cached result, argument-dependent
 * key resolver and manual expiration logic.
 */
export interface CacheConfig {
  maxAge?: number;
  resolver?: Resolver;
  expire?: (entry: CacheEntry, context: any) => boolean | void;
}

/**
 * Throw error in case the decorator used incorrectly.
 */
export function throwUsageError(): never {
  throw new Error(`${uniqueId} must be applied to method or getter`);
}
