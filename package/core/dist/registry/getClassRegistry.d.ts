import { ClassRegistry } from './classRegistry';
/**
 * Get the registry associated with the class (prototype).
 *
 * @param target Class (prototype).
 * @return Registry in case it's defined; undefined otherwise.
 */
export declare function getClassRegistry(target: object): ClassRegistry | undefined;
/**
 * Get or create the registry associated with the class (prototype).
 *
 * @param target Class (prototype).
 * @return Existing or newly created registry.
 */
export declare function getOrCreateClassRegistry(target: object): ClassRegistry;
