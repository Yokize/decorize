import { ParamRegistry } from './paramRegistry';
import { createRegistry } from './createRegistry';
import { getPropertyRegistry } from './getPropertyRegistry';

/**
 * Get registry linked with the class (prototype), method & parameter.
 *
 * @param target Class (prototype).
 * @param method Method name.
 * @param paramIdx Parameter index.
 * @return Registry in case is defined; undefined otherwise.
 */
export function getParamRegistry(target: object, method: PropertyKey, paramIdx: number): ParamRegistry | undefined {
  // Retrieve from parameter registry in case it's exist.
  return getPropertyRegistry(target, method)?.parameter[paramIdx];
}

/**
 * Get or create registry linked with the class (prototype), method & parameter.
 *
 * @param target Class (prototype).
 * @param method Method name.
 * @param paramIdx Parameter index.
 * @return Existing or newly created registry.
 */
export function getOrCreateParamRegistry(target: object, method: PropertyKey, paramIdx: number): ParamRegistry {
  return getParamRegistry(target, method, paramIdx) ?? createRegistry();
}
