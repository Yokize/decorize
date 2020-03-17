import { defineMetadata } from '../reflect/defineMetadata';
import { _registryKey } from './baseRegistry';
import { ClassRegistry } from './classRegistry';

/**
 * Link registry with the class (prototype).
 *
 * @param target Class (prototype).
 * @param registry Registry to link.
 */
export function setClassRegistry(target: object, registry: ClassRegistry): void {
  defineMetadata(_registryKey, registry, target);
}
