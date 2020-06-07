import { BaseRegistry, BaseRegistryEntry } from './baseRegistry';

/**
 * The interface describes the structure of the parameter registry.
 */
export interface ParamRegistry extends BaseRegistry {
  paramIdx: number;
}

/**
 * The interface describes the structure of the parameter registry entry.
 */
export interface ParamRegistryEntry extends BaseRegistryEntry {}
