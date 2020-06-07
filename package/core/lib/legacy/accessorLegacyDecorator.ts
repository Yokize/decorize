import { Decorator } from '../decorator';
import { addProperty } from '../registry/addProperty';

/**
 * Decorator's logic to be executed.
 *
 * @param target Class (prototype).
 * @param property Accessor name.
 * @param descriptor Accessor descriptor.
 * @param metadata Configs & params.
 * @return Accessor descriptor; undefined.
 */
export type AccessorLogic = (
  target: any,
  property: PropertyKey,
  descriptor: PropertyDescriptor,
  metadata: any
) => PropertyDescriptor | void;

/**
 * Creates legacy accessor decorator that executes logic at runtime.
 * There is no separate type for accessor decorator in lib.es5.d.ts
 * so used MethodDecorator as it's have same signature.
 *
 * @param name Decorator name.
 * @param metadata Metadata.
 * @param logic Logic to execute.
 * @return Created accessor decorator.
 */
export function accessorLegacyDecorator(name: any, metadata?: any, logic?: AccessorLogic): MethodDecorator {
  // Legacy accessor decorator.
  return (target: object, property: PropertyKey, descriptor: PropertyDescriptor): PropertyDescriptor | void => {
    // Register accessor decorator.
    addProperty(target, property, {
      name,
      metadata,
      spec: 'legacy',
      type: Decorator.Accessor
    });

    // Execute decorator logic at runtime.
    return logic ? logic(target, property, descriptor, metadata) : descriptor;
  };
}
