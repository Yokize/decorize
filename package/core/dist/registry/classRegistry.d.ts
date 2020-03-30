import { PropertyRegistry } from './propertyRegistry';
import { BaseRegistryEntry, BaseRegistry } from './baseRegistry';
/**
 * The interface describes the structure of the class registry.
 */
export interface ClassRegistry extends BaseRegistry {
    property: {
        [name: string]: PropertyRegistry;
    };
}
/**
 * The interface describes the structure of the class registry entry.
 */
export interface ClassRegistryEntry extends BaseRegistryEntry {
}
