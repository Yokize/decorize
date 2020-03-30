/**
 * Decorator's logic to be executed.
 *
 * @param target Class (prototype).
 * @param property Accessor name.
 * @param descriptor Accessor descriptor.
 * @param metadata Configs & params.
 * @return Accessor descriptor; undefined.
 */
export declare type AccessorLogic = (target: any, property: PropertyKey, descriptor: PropertyDescriptor, metadata: any) => PropertyDescriptor | void;
/**
 * Creates legacy accessor decorator that executes logic at runtime.
 * There is no separate type for accessor decorator in lib.es5.d.ts
 * so used MethodDecorator as it's have same signature.
 *
 * @param name Decorator name.
 * @param logic Logic to execute.
 * @param metadata Configs & params.
 * @return Created accessor decorator.
 */
export declare function accessorLegacyDecorator(name: any, logic: AccessorLogic, metadata?: any): MethodDecorator;
