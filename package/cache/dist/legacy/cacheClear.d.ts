import { ClearConfig } from '../clear';
/**
 * Clear the cached results of the method or getter.
 *
 * @param config Config.
 * @return Method or accessor decorator.
 */
export declare function CacheClear(config?: ClearConfig): MethodDecorator;
/**
 * Clear the cached results of the method or getter.
 *
 * @param target Class (prototype).
 * @param property Property name.
 * @param descriptor Property Descriptor.
 * @return The descriptor with the clear logic.
 */
export declare function CacheClear(target: object, property: PropertyKey, descriptor: PropertyDescriptor): PropertyDescriptor;
/**
 * Clear the cached results of the method or getter.
 *
 * @param config Config.
 * @return Method or accessor decorator.
 */
export declare function cacheClear(config?: ClearConfig): MethodDecorator;
/**
 * Clear the cached results of the method or getter.
 *
 * @param target Class (prototype).
 * @param property Property name.
 * @param descriptor Property Descriptor.
 * @return The descriptor with the clear logic.
 */
export declare function cacheClear(target: object, property: PropertyKey, descriptor: PropertyDescriptor): PropertyDescriptor;
