import { getOwnMetadata } from '../getOwnMetadata';

/**
 * Get the designed type of constructor or method parameters.
 * TypeScript supports an experimental reflection feature that
 * emits metadata with params types.
 *
 * @param target The object associated with metadata.
 * @param method The method that contains parameters.
 * @return Lexically designed params types.
 */
export function getDesignParamTypes(target: object, method?: PropertyKey): any[] {
  return getOwnMetadata('design:paramtypes', target, method);
}
