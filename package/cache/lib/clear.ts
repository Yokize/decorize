/**
 * Unique decorator ID.
 */
export const uniqueId: string = 'decorize:cache:@clear';

/**
 * The interface describes the structure of the decorator's configuration,
 * which defines how the clearing process should be done. The `before` and
 * `after` configuration options defines whether cleaning should be done
 * before or after the method or accessor execution. The decorator cannot
 * be applied to both the getter and setter of the same property, so its
 * possible to specify explicitly the `getter` or `setter`.
 */
export interface ClearConfig {
  before?: boolean;
  after?: boolean;
  getter?: boolean;
  setter?: boolean;
}

/**
 * Throw error in case the decorator used incorrectly.
 */
export function throwUsageError(): never {
  throw new Error(`${uniqueId} must be applied to method or accessor`);
}
