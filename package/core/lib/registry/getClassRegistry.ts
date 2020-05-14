import { getOwnMetadata } from '../reflect/getOwnMetadata';
import { _registryKey } from './baseRegistry';
import { ClassRegistry } from './classRegistry';

/**
 * Get the registry associated with the class (prototype).
 *
 * @param target Class (prototype).
 * @return Registry in case it's defined; undefined otherwise.
 */
export function getClassRegistry(target: object): ClassRegistry | undefined {
  return getOwnMetadata(_registryKey, target);
}

/**
 * Get or create the registry associated with the class (prototype).
 *
 * @param target Class (prototype).
 * @return Existing or newly created registry.
 */
export function getOrCreateClassRegistry(target: object): ClassRegistry {
  return getClassRegistry(target) ?? { decorator: [], property: {} };
}
