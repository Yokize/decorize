import { setParamRegistry } from './setParamRegistry';
import { getOrCreateParamRegistry } from './getParamRegistry';
import { ParamRegistry, ParamRegistryEntry } from './paramRegistry';

/**
 * Register the decorator in the param registry for advanced
 * decoration and inspection.
 *
 * @param target Class (prototype).
 * @param method Method name.
 * @param paramIdx Parameter index.
 * @param entry Decorator metadata.
 */
export function addParam(target: object, method: PropertyKey, paramIdx: number, entry: ParamRegistryEntry): void {
  // Get the registry or create the new one.
  const registry: ParamRegistry = getOrCreateParamRegistry(target, method, paramIdx);

  // Add directly to the registry.
  registry.decorator.push(entry);

  // Link registry with the class (prototype), method & param index.
  setParamRegistry(target, method, paramIdx, registry);
}
