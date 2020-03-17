import { ParamRegistry } from './paramRegistry';
/**
 * Get registry linked with the class (prototype), method & parameter.
 *
 * @param target Class (prototype).
 * @param method Method name.
 * @param paramIdx Parameter index.
 * @return Registry in case is defined; undefined otherwise.
 */
export declare function getParamRegistry(target: object, method: PropertyKey, paramIdx: number): ParamRegistry | undefined;
/**
 * Get or create registry linked with the class (prototype), method & parameter.
 *
 * @param target Class (prototype).
 * @param method Method name.
 * @param paramIdx Parameter index.
 * @return Existing or newly created registry.
 */
export declare function getOrCreateParamRegistry(target: object, method: PropertyKey, paramIdx: number): ParamRegistry;
