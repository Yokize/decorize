import { ParamRegistry } from './paramRegistry';
/**
 * Get the registry associated with the (prototype), method & parameter.
 *
 * @param target Class (prototype).
 * @param method Method name.
 * @param paramIdx Parameter index.
 * @return Registry in case it's defined; undefined otherwise.
 */
export declare function getParamRegistry(target: object, method: PropertyKey, paramIdx: number): ParamRegistry | undefined;
/**
 * Get or create the registry associated with the class (prototype), method & parameter.
 *
 * @param target Class (prototype).
 * @param method Method name.
 * @param paramIdx Parameter index.
 * @return Existing or newly created registry.
 */
export declare function getOrCreateParamRegistry(target: object, method: PropertyKey, paramIdx: number): ParamRegistry;
