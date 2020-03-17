import { getOwnMetadata } from '../getOwnMetadata';

/**
 * Get designed type of method return.
 * Typescript support an experimental reflection feature which
 * emit metadata with parameter types.
 *
 * @param target Object associated with metadata.
 * @param method Method for which to get designed return type.
 * @return Lexically designed return type.
 */
export function getDesignReturnType(target: object, method: PropertyKey): any {
  return getOwnMetadata('design:returntype', target, method);
}
