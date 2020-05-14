import { Decorator } from '../decorator';

/* istanbul ignore next */
export const _registryKey: PropertyKey = Symbol
  ? // Private symbol.
    Symbol.for('Decorize: Registry')
  : // Namespaced key.
    '__decorize::registry__';

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
