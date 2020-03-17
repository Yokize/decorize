import { ClassRegistry } from './classRegistry';
import { PropertyRegistry } from './propertyRegistry';
import { setClassRegistry } from './setClassRegistry';
import { getOrCreateClassRegistry } from './getClassRegistry';

/**
 * Link registry with the class (prototype) & property.
 *
 * @param target Class (prototype).
 * @param property Property name.
 * @param registry Registry to link.
 */
export function setPropertyRegistry(target: object, property: PropertyKey, registry: PropertyRegistry): void {
  // Get or create registry associated with the class.
  const classRegistry: ClassRegistry = getOrCreateClassRegistry(target);

  // Assign registry to into property section.
  classRegistry.property[<any>property] = registry;

  // Link registry with the class (prototype).
  setClassRegistry(target, classRegistry);
}
