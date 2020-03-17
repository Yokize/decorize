import { PropertyRegistry } from './propertyRegistry';
import { BaseRegistryEntry, BaseRegistry } from './baseRegistry';

/**
 * Structure of the class registry.
 */
export interface ClassRegistry extends BaseRegistry {
  property: {
    [name: string]: PropertyRegistry;
  };
}

/**
 * Structure of the class registry entry.
 */
export interface ClassRegistryEntry extends BaseRegistryEntry {}
