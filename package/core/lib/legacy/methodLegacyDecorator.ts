import { Decorator } from '../decorator';
import { addProperty } from '../registry/addProperty';

/**
 * Decorator's logic to be executed.
 *
 * @param target Class (prototype).
 * @param property Method name.
 * @param descriptor Method descriptor.
 * @param metadata Configs & params.
 * @return Method descriptor; undefined.
 */
export type MethodLogic = (
  target: any,
  property: PropertyKey,
  descriptor: PropertyDescriptor,
  metadata: any
) => PropertyDescriptor | void;

/**
 * Creates legacy method decorator that executes logic at runtime.
 *
 * @param name Decorator name.
 * @param metadata Metadata.
 * @param logic Logic to execute.
 * @return Created method decorator.
 */
export function methodLegacyDecorator(name: any, metadata?: any, logic?: MethodLogic): MethodDecorator {
  // Legacy method decorator.
  return (target: object, property: PropertyKey, descriptor: PropertyDescriptor): PropertyDescriptor | void => {
    // Register method decorator.
    addProperty(target, property, {
      name,
      metadata,
      spec: 'legacy',
      type: Decorator.Method
    });

    // Execute decorator logic at runtime.
    return logic ? logic(target, property, descriptor, metadata) : descriptor;
  };
}
