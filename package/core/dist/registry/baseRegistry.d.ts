import { Decorator } from '../decorator';
export declare const _registryKey: PropertyKey;
/**
 * The interface describes the base structure of the registry,
 * which contains applied decorators.
 */
export interface BaseRegistry {
    decorator?: BaseRegistryEntry[];
}
/**
 * The interface describes the base structure of the decorator
 * entry, which contains the name, type, spec and other metadata.
 */
export interface BaseRegistryEntry {
    name: string | symbol;
    type: Decorator;
    spec: string;
    metadata?: any;
    [key: string]: any;
}
