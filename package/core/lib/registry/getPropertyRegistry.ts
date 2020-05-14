import { PropertyRegistry } from './propertyRegistry';
import { getClassRegistry } from './getClassRegistry';

/**
 * Get the registry associated with the class (prototype) & property.
 *
 * @param target Class (prototype).
 * @param property Property name.
 * @return Registry in case it's defined; undefined otherwise.
 */
export function getPropertyRegistry(target: object, property: PropertyKey): PropertyRegistry | undefined {
  // Retrieve from the property registry in case it exists.
  return getClassRegistry(target)?.property[<any>property];
}

/**
 * Get or create the registry associated with the the class (prototype) & property.
 *
 * @param target Class (prototype).
 * @param property Property name.
 * @return Existing or newly created registry.
 */
export function getOrCreatePropertyRegistry(target: object, property: PropertyKey): PropertyRegistry {
  return getPropertyRegistry(target, property) ?? { decorator: [], parameter: {} };
}
