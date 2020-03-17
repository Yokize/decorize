import { Decorator } from '../decorator';
import { addClass } from '../registry/addClass';

/**
 * Decorator logic to be executed.
 *
 * @param target Class.
 * @param metadata Configs & params.
 * @return Decorated class; undefined.
 */
export type ClassLogic = (target: any, metadata: any) => any | void;

/**
 * Creates legacy class decorator which execute logic on runtime.
 *
 * @param name Decorator name.
 * @param logic Logic to execute.
 * @param metadata Configs & params.
 * @return Created class decorator.
 */
export function classLegacyDecorator(name: any, logic: ClassLogic, metadata?: any): ClassDecorator {
  // Legacy class decorator.
  return (target: any): any | void => {
    // Register decorator at the class.
    addClass(target, {
      name,
      metadata,
      spec: 'legacy',
      type: Decorator.Class
    });

    // Execute decorator logic at runtime.
    return logic(target, metadata);
  };
}
