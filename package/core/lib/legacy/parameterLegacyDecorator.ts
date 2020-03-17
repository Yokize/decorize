import { Decorator } from '../decorator';
import { addParam } from '../registry/addParam';

/**
 * Decorator logic to be executed.
 *
 * @param target Class (prototype).
 * @param property Method name.
 * @param paramIndex Parameter index.
 * @param metadata Configs & params.
 */
export type ParameterLogic = (target: any, property: PropertyKey, paramIndex: number, metadata: any) => void;

/**
 * Creates legacy parameter decorator which execute logic on runtime.
 *
 * @param name Decorator name.
 * @param logic Logic to execute.
 * @param metadata Configs & params.
 * @return Created param decorator.
 */
export function parameterLegacyDecorator(name: any, logic: ParameterLogic, metadata?: any): ParameterDecorator {
  // Legacy parameter decorator.
  return (target: object, property: PropertyKey, paramIndex: number): void => {
    // Register decorator at the param.
    addParam(target, property, paramIndex, {
      name,
      metadata,
      spec: 'ts',
      type: Decorator.Parameter
    });

    // Execute decorator logic at runtime.
    logic(target, property, paramIndex, metadata);
  };
}
