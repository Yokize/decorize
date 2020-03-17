import { ClassRegistry } from './classRegistry';
/**
 * Get registry linked with the class (prototype).
 *
 * @param target Class (prototype).
 * @return Registry in case is defined; undefined otherwise.
 */
export declare function getClassRegistry(target: object): ClassRegistry | undefined;
/**
 * Get or create registry linked with the class (prototype).
 *
 * @param target Class (prototype).
 * @return Existing or newly created registry.
 */
export declare function getOrCreateClassRegistry(target: object): ClassRegistry;
