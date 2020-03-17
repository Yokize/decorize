/**
 * Decorator logic to be executed.
 *
 * @param target Class (prototype).
 * @param property Method name.
 * @param paramIndex Parameter index.
 * @param metadata Configs & params.
 */
export declare type ParameterLogic = (target: any, property: PropertyKey, paramIndex: number, metadata: any) => void;
/**
 * Creates legacy parameter decorator which execute logic on runtime.
 *
 * @param name Decorator name.
 * @param logic Logic to execute.
 * @param metadata Configs & params.
 * @return Created param decorator.
 */
export declare function parameterLegacyDecorator(name: any, logic: ParameterLogic, metadata?: any): ParameterDecorator;
