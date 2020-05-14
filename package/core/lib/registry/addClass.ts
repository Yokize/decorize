import { setClassRegistry } from './setClassRegistry';
import { getOrCreateClassRegistry } from './getClassRegistry';
import { ClassRegistry, ClassRegistryEntry } from './classRegistry';

/**
 * Register the decorator in the class registry for advanced
 * decoration and inspection.
 *
 * @param target Class (prototype).
 * @param entry Decorator metadata.
 */
export function addClass(target: object, entry: ClassRegistryEntry): void {
  // Get the registry or create the new one.
  const registry: ClassRegistry = getOrCreateClassRegistry(target);

  // Add directly to the registry.
  registry.decorator.push(entry);

  // Link registry with the class (prototype).
  setClassRegistry(target, registry);
}
