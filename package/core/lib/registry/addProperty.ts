import { setPropertyRegistry } from './setPropertyRegistry';
import { getOrCreatePropertyRegistry } from './getPropertyRegistry';
import { PropertyRegistry, PropertyRegistryEntry } from './propertyRegistry';

/**
 * Register the decorator in the property registry for advanced
 * decoration and inspection.
 *
 * @param target Class (prototype).
 * @param property Property name.
 * @param entry Decorator metadata.
 */
export function addProperty(target: object, property: PropertyKey, entry: PropertyRegistryEntry): void {
  // Get the registry or create the new one.
  const registry: PropertyRegistry = getOrCreatePropertyRegistry(target, property);

  // Add directly to the registry.
  registry.decorator.push(entry);

  // Link registry with the class (prototype) & property.
  setPropertyRegistry(target, property, registry);
}
