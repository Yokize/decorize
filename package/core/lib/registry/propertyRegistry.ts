import { ParamRegistry } from './paramRegistry';
import { BaseRegistry, BaseRegistryEntry } from './baseRegistry';

/**
 * Structure of the property registry.
 */
export interface PropertyRegistry extends BaseRegistry {
  parameter: {
    [paramIdx: number]: ParamRegistry;
  };
}

/**
 * Structure of the parameter registry entry.
 */
export interface PropertyRegistryEntry extends BaseRegistryEntry {}
