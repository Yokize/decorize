import { PropertyRegistryEntry } from './propertyRegistry';
/**
 * Register the decorator in the property registry for advanced
 * decoration and inspection.
 *
 * @param target Class (prototype).
 * @param property Property name.
 * @param entry Decorator metadata.
 */
export declare function addProperty(target: object, property: PropertyKey, entry: PropertyRegistryEntry): void;
