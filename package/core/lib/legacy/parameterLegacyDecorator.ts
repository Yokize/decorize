import { Decorator } from '../decorator';
import { addParam } from '../registry/addParam';

/**
 * Decorator's logic to be executed.
 *
 * @param target Class (prototype).
 * @param property Method name.
 * @param paramIndex Parameter index.
 * @param metadata Configs & params.
 */
export type ParameterLogic = (target: any, property: PropertyKey, paramIndex: number, metadata: any) => void;

/**
 * Creates legacy parameter decorator that executes logic at runtime.
 *
 * @param name Decorator name.
 * @param metadata Metadata.
 * @param logic Logic to execute.
 * @return Created param decorator.
 */
export function parameterLegacyDecorator(name: any, metadata?: any, logic?: ParameterLogic): ParameterDecorator {
  // Legacy parameter decorator.
  return (target: object, property: PropertyKey, paramIndex: number): void => {
    // Register parameter decorator.
    addParam(target, property, paramIndex, {
      name,
      metadata,
      spec: 'ts',
      type: Decorator.Parameter
    });

    // Execute decorator logic at runtime.
    if (logic) logic(target, property, paramIndex, metadata);
  };
}
