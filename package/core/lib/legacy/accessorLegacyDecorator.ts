import { Decorator } from '../decorator';
import { addProperty } from '../registry/addProperty';

/**
 * Decorator logic to be executed.
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
 * Creates legacy accessor decorator which execute logic on runtime.
 * There is no separate type for accessor decorator in lib.es5.d.ts
 * so used MethodDecorator as it's have same signature.
 *
 * @param name Decorator name.
 * @param logic Logic to execute.
 * @param metadata Configs & params.
 * @return Created accessor decorator.
 */
export function accessorLegacyDecorator(name: any, logic: AccessorLogic, metadata?: any): MethodDecorator {
  // Legacy accessor decorator.
  return (target: object, property: PropertyKey, descriptor: PropertyDescriptor): PropertyDescriptor | void => {
    // Register decorator at the property.
    addProperty(target, property, {
      name,
      metadata,
      spec: 'legacy',
      type: Decorator.Accessor
    });

    // Execute decorator logic at runtime.
    return logic(target, property, descriptor, metadata);
  };
}
