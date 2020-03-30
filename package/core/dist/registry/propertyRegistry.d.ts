import { ParamRegistry } from './paramRegistry';
import { BaseRegistry, BaseRegistryEntry } from './baseRegistry';
/**
 * The interface describes the structure of the property registry.
 */
export interface PropertyRegistry extends BaseRegistry {
    parameter: {
        [paramIdx: number]: ParamRegistry;
    };
}
/**
 * The interface describes the structure of the property registry entry.
 */
export interface PropertyRegistryEntry extends BaseRegistryEntry {
}
