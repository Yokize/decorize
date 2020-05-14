import { ParamRegistry } from './paramRegistry';
import { PropertyRegistry } from './propertyRegistry';
import { setPropertyRegistry } from './setPropertyRegistry';
import { getOrCreatePropertyRegistry } from './getPropertyRegistry';

/**
 * Link the registry with the class (prototype), method & param.
 *
 * @param target Class (prototype).
 * @param method Method name.
 * @param paramIdx Parameter index.
 * @param registry Registry to link.
 */
export function setParamRegistry(target: object, method: PropertyKey, paramIdx: number, registry: ParamRegistry): void {
  // Receive or create the registry associated with the method.
  const propertyRegistry: PropertyRegistry = getOrCreatePropertyRegistry(target, method);

  // Assign the registry into the parameter section.
  propertyRegistry.parameter[paramIdx] = registry;

  // Link the registry with the class (prototype) and method.
  setPropertyRegistry(target, method, propertyRegistry);
}
