import { Decorator } from '../decorator';
import { addProperty } from '../registry/addProperty';

/**
 * Decorator logic to be executed.
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
 * Creates legacy method decorator which execute logic on runtime.
 *
 * @param name Decorator name.
 * @param logic Logic to execute.
 * @param metadata Configs & params.
 * @return Created method decorator.
 */
export function methodLegacyDecorator(name: any, logic: MethodLogic, metadata?: any): MethodDecorator {
  // Legacy method decorator.
  return (target: object, property: PropertyKey, descriptor: PropertyDescriptor): PropertyDescriptor | void => {
    // Register decorator at the property.
    addProperty(target, property, {
      name,
      metadata,
      spec: 'legacy',
      type: Decorator.Method
    });

    // Execute decorator logic at runtime.
    return logic(target, property, descriptor, metadata);
  };
}
