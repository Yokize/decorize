import { ClassRegistryEntry } from './classRegistry';
/**
 * Register the decorator in the class registry for advanced
 * decoration and inspection.
 *
 * @param target Class (prototype).
 * @param entry Decorator metadata.
 */
export declare function addClass(target: object, entry: ClassRegistryEntry): void;
