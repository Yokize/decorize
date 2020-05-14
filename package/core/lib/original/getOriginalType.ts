import { Decorator } from '../decorator';
import { BaseRegistry } from '../registry/baseRegistry';
import { getPropertyRegistry } from '../registry/getPropertyRegistry';

/**
 * Decorator can change or define a completely new descriptor of the
 * property so sometimes its important to determine original type.
 * Original type used for an advanced and accurate decoration.
 */
export enum OriginalType {
  Method = 'method',
  Property = 'property',
  Accessor = 'accessor'
}

/**
 * Original type directly depends on decorator type so mapping
 * can be used to determine it.
 */
const originalTypeMapping: any = {
  [Decorator.Accessor]: OriginalType.Accessor,
  [Decorator.Property]: OriginalType.Property,
  [Decorator.Method]: OriginalType.Method
};

/**
 * Determine original type based on already registered decorators.
 * In case decorator change descriptor without registering itself
 * its not possible to determine original type.
 *
 * @param target The class on which decorators are registered.
 * @param property The property for which to get the original type.
 * @return The original type; undefined otherwise.
 */
export function getOriginalType(target: object, property: PropertyKey): OriginalType | undefined {
  // Retrieve registry which contain records with registered decorators.
  const registry: BaseRegistry = getPropertyRegistry(target, property);

  // Use mapping to get original type from the registry.
  return registry?.decorator?.[0] ? originalTypeMapping[registry.decorator[0].type] : undefined;
}
