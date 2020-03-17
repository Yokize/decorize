import { ParamRegistry } from './paramRegistry';
/**
 * Link registry with the class (prototype), method & param.
 *
 * @param target Class (prototype).
 * @param method Method name.
 * @param paramIdx Parameter index.
 * @param registry Registry to link.
 */
export declare function setParamRegistry(target: object, method: PropertyKey, paramIdx: number, registry: ParamRegistry): void;
