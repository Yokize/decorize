import { CacheConfig } from '../cache';
/**
 * Cache the result of the method or getter.
 *
 * @param config Config.
 * @return Method or getter decorator.
 */
export declare function Cache(config?: CacheConfig): MethodDecorator;
/**
 * Cache the result of the method or getter.
 *
 * @param target Class (prototype).
 * @param property Property name.
 * @param descriptor Property Descriptor.
 * @return The descriptor with the cache logic.
 */
export declare function Cache(target: object, property: PropertyKey, descriptor: PropertyDescriptor): PropertyDescriptor;
/**
 * Cache the result of the method or getter.
 *
 * @param config Config.
 * @return Method or getter decorator.
 */
export declare function cache(config?: CacheConfig): MethodDecorator;
/**
 * Cache the result of the method or getter.
 *
 * @param target Class (prototype).
 * @param property Property name.
 * @param descriptor Property Descriptor.
 * @return The descriptor with the cache logic.
 */
export declare function cache(target: object, property: PropertyKey, descriptor: PropertyDescriptor): PropertyDescriptor;
