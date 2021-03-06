import { Decorator } from '../decorator';
import { addClass } from '../registry/addClass';

/**
 * Decorator's logic to be executed.
 *
 * @param target Class.
 * @param metadata Configs & params.
 * @return Decorated class; undefined.
 */
export type ClassLogic = (target: any, metadata: any) => any | void;

/**
 * Creates legacy class decorator that executes logic at runtime.
 *
 * @param name Decorator name.
 * @param metadata Metadata.
 * @param logic Logic to execute.
 * @return Created class decorator.
 */
export function classLegacyDecorator(name: any, metadata?: any, logic?: ClassLogic): ClassDecorator {
  // Legacy class decorator.
  return (target: any): any | void => {
    // Register class decorator.
    addClass(target, {
      name,
      metadata,
      spec: 'legacy',
      type: Decorator.Class
    });

    // Execute decorator logic at runtime.
    return logic ? logic(target, metadata) : target;
  };
}
