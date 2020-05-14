import { ParamRegistryEntry } from './paramRegistry';
/**
 * Register the decorator in the param registry for advanced
 * decoration and inspection.
 *
 * @param target Class (prototype).
 * @param method Method name.
 * @param paramIdx Parameter index.
 * @param entry Decorator metadata.
 */
export declare function addParam(target: object, method: PropertyKey, paramIdx: number, entry: ParamRegistryEntry): void;
