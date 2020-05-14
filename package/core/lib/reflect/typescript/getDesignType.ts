import { getOwnMetadata } from '../getOwnMetadata';

/**
 * Get the designed type of property.
 * TypeScript supports an experimental reflection feature that
 * emits metadata with parameters types.
 *
 * @param target The object associated with metadata.
 * @param property The property for which to get the type.
 * @return Lexically designed property type.
 */
export function getDesignType(target: object, property: PropertyKey): any {
  return getOwnMetadata('design:type', target, property);
}
