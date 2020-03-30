/**
 * Unique decorator ID.
 */
export declare const uniqueId: string;
/**
 * The interface describes the basic metadata structure which contains
 * the bound function. The main reason for caching the bound function
 * is to avoid unnecessary bindings and increase performance.
 */
export interface Metadata {
    bound?: Function;
}
/**
 * Throw error in case the decorator used incorrectly.
 */
export declare function throwUsageError(): never;
