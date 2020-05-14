import { getOwnMetadata } from '../getOwnMetadata';

/**
 * Get the designed type of method return.
 * TypeScript supports an experimental reflection feature that
 * emits metadata with return value type.
 *
 * @param target The object associated with metadata.
 * @param method The method for which to get the return type.
 * @return Lexically designed return type.
 */
export function getDesignReturnType(target: object, method: PropertyKey): any {
  return getOwnMetadata('design:returntype', target, method);
}
