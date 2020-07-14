/**
 * Unique decorator ID.
 */
export const uniqueId: string = 'decorize:@deprecate';

/**
 * The interface describes the structure of the decorator configuration,
 * which defines warning message and scope of the decorator. The decorator
 * cannot be applied separately to both the getter and setter of the same
 * property, so its possible to specify explicitly the `getter` or `setter`.
 */
export interface DeprecateConfig {
  setter?: boolean;
  getter?: boolean;
  message?: string | string[];
}

/**
 * Throw error in case the decorator used incorrectly.
 */
export function throwUsageError(): never {
  throw new Error(`${uniqueId} used incorrectly`);
}
