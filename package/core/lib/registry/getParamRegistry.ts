import { ParamRegistry } from './paramRegistry';
import { getPropertyRegistry } from './getPropertyRegistry';

/**
 * Get the registry associated with the (prototype), method & parameter.
 *
 * @param target Class (prototype).
 * @param method Method name.
 * @param paramIdx Parameter index.
 * @return Registry in case it's defined; undefined otherwise.
 */
export function getParamRegistry(target: object, method: PropertyKey, paramIdx: number): ParamRegistry | undefined {
  // Retrieve from the parameter registry in case it exists.
  return getPropertyRegistry(target, method)?.parameter[paramIdx];
}

/**
 * Get or create the registry associated with the class (prototype), method & parameter.
 *
 * @param target Class (prototype).
 * @param method Method name.
 * @param paramIdx Parameter index.
 * @return Existing or newly created registry.
 */
export function getOrCreateParamRegistry(target: object, method: PropertyKey, paramIdx: number): ParamRegistry {
  return getParamRegistry(target, method, paramIdx) ?? { decorator: [] };
}
