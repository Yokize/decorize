/**
 * Decorator's logic to be executed.
 *
 * @param target Class (prototype).
 * @param property Property name.
 * @param metadata Configs & params.
 */
export declare type PropertyLogic = (target: any, property: PropertyKey, metadata: any) => void;
/**
 * Creates legacy property decorator that executes logic at runtime.
 *
 * @param name Decorator name.
 * @param logic Logic to execute.
 * @param metadata Configs & params.
 * @return Created property decorator.
 */
export declare function propertyLegacyDecorator(name: any, logic: PropertyLogic, metadata?: any): PropertyDecorator;
