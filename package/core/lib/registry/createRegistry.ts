import { BaseRegistry } from './baseRegistry';

/**
 * Create base registry.
 *
 * @return Empty base registry.
 */
export function createRegistry(): BaseRegistry {
  return { decorator: [] };
}
