import { ClassRegistry } from './classRegistry';
import { PropertyRegistry } from './propertyRegistry';
import { setClassRegistry } from './setClassRegistry';
import { getOrCreateClassRegistry } from './getClassRegistry';

/**
 * Link the registry with the class (prototype) & property.
 *
 * @param target Class (prototype).
 * @param property Property name.
 * @param registry Registry to link.
 */
export function setPropertyRegistry(target: object, property: PropertyKey, registry: PropertyRegistry): void {
  // Receive or create the registry associated with the class.
  const classRegistry: ClassRegistry = getOrCreateClassRegistry(target);

  // Assign the registry into the property section.
  classRegistry.property[<any>property] = registry;

  // Link the registry with the class (prototype).
  setClassRegistry(target, classRegistry);
}
