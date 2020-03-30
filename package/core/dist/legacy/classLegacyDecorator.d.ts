/**
 * Decorator's logic to be executed.
 *
 * @param target Class.
 * @param metadata Configs & params.
 * @return Decorated class; undefined.
 */
export declare type ClassLogic = (target: any, metadata: any) => any | void;
/**
 * Creates legacy class decorator that executes logic at runtime.
 *
 * @param name Decorator name.
 * @param logic Logic to execute.
 * @param metadata Configs & params.
 * @return Created class decorator.
 */
export declare function classLegacyDecorator(name: any, logic: ClassLogic, metadata?: any): ClassDecorator;
