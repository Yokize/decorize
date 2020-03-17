import { ParamRegistry } from './paramRegistry';
import { PropertyRegistry } from './propertyRegistry';
import { setPropertyRegistry } from './setPropertyRegistry';
import { getOrCreatePropertyRegistry } from './getPropertyRegistry';

/**
 * Link registry with the class (prototype), method & param.
 *
 * @param target Class (prototype).
 * @param method Method name.
 * @param paramIdx Parameter index.
 * @param registry Registry to link.
 */
export function setParamRegistry(target: object, method: PropertyKey, paramIdx: number, registry: ParamRegistry): void {
  // Get or create registry associated with the method.
  const propertyRegistry: PropertyRegistry = getOrCreatePropertyRegistry(target, method);

  // Assign registry into parameter section.
  propertyRegistry.parameter[paramIdx] = registry;

  // Link registry with the class (prototype), method & param.
  setPropertyRegistry(target, method, propertyRegistry);
}
