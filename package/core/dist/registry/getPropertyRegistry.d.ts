import { PropertyRegistry } from './propertyRegistry';
/**
 * Get registry linked with the class (prototype) & property.
 *
 * @param target Class (prototype).
 * @param property Property name.
 * @return Registry in case is defined; undefined otherwise.
 */
export declare function getPropertyRegistry(target: object, property: PropertyKey): PropertyRegistry | undefined;
/**
 * Get or create registry linked with the class (prototype) & property.
 *
 * @param target Class (prototype).
 * @param property Property name.
 * @return Existing or newly created registry.
 */
export declare function getOrCreatePropertyRegistry(target: object, property: PropertyKey): PropertyRegistry;
