import { PropertyRegistry } from './propertyRegistry';
/**
 * Link the registry with the class (prototype) & property.
 *
 * @param target Class (prototype).
 * @param property Property name.
 * @param registry Registry to link.
 */
export declare function setPropertyRegistry(target: object, property: PropertyKey, registry: PropertyRegistry): void;
