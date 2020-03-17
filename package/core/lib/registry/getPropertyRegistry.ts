import { createRegistry } from './createRegistry';
import { PropertyRegistry } from './propertyRegistry';
import { getClassRegistry } from './getClassRegistry';

/**
 * Get registry linked with the class (prototype) & property.
 *
 * @param target Class (prototype).
 * @param property Property name.
 * @return Registry in case is defined; undefined otherwise.
 */
export function getPropertyRegistry(target: object, property: PropertyKey): PropertyRegistry | undefined {
  // Retrieve from property registry in case it's exist.
  return getClassRegistry(target)?.property[<any>property];
}

/**
 * Get or create registry linked with the class (prototype) & property.
 *
 * @param target Class (prototype).
 * @param property Property name.
 * @return Existing or newly created registry.
 */
export function getOrCreatePropertyRegistry(target: object, property: PropertyKey): PropertyRegistry {
  return getPropertyRegistry(target, property) ?? { ...createRegistry(), parameter: {} };
}
