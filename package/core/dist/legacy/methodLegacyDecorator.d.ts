/**
 * Decorator logic to be executed.
 *
 * @param target Class (prototype).
 * @param property Method name.
 * @param descriptor Method descriptor.
 * @param metadata Configs & params.
 * @return Method descriptor; undefined.
 */
export declare type MethodLogic = (target: any, property: PropertyKey, descriptor: PropertyDescriptor, metadata: any) => PropertyDescriptor | void;
/**
 * Creates legacy method decorator which execute logic on runtime.
 *
 * @param name Decorator name.
 * @param logic Logic to execute.
 * @param metadata Configs & params.
 * @return Created method decorator.
 */
export declare function methodLegacyDecorator(name: any, logic: MethodLogic, metadata?: any): MethodDecorator;
