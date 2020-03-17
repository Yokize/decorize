import { Decorator } from '../decorator';
export declare const _registryKey: PropertyKey;
/**
 * Base structure of the registry which store
 * applied decorators.
 */
export interface BaseRegistry {
    decorator?: BaseRegistryEntry[];
}
/**
 * Base structure of the decorator entry which used for
 * advanced decorating or inspection.
 */
export interface BaseRegistryEntry {
    name: string | symbol;
    type: Decorator;
    spec: string;
    metadata?: any;
    [key: string]: any;
}
