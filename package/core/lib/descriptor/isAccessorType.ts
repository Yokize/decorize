import isFunction from 'lodash/isFunction';

/**
 * Determine whether the descriptor contains at least one accessor.
 *
 * @param descriptor The descriptor to check.
 * @return True in case getter or setter is defined; false otherwise.
 */
export function isAccessorType(descriptor: PropertyDescriptor): boolean {
  return isFunction(descriptor?.get) || isFunction(descriptor?.set);
}
