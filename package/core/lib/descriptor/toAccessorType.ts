import isBoolean from 'lodash/isBoolean';
import { createSetter } from './createSetter';

/**
 * Create the property accessor type descriptor based on
 * specified attributes.
 *
 * @param property Property name.
 * @param attributes Base descriptor attributes.
 * @return Newly created accessor descriptor.
 */
export function toAccessorType<T = any>(property: PropertyKey, attributes: PropertyDescriptor): PropertyDescriptor {
  // Create the new descriptor which contains `configurable` and `enumerable`.
  const { get, set, value, writable, ...newDescriptor }: any = attributes;

  // Reuse the setter or undefined.
  newDescriptor.set = set;

  // Reuse the getter or undefined.
  newDescriptor.get = get;

  // Determine whether the `writable` is defined.
  if (isBoolean(writable) || !(get || set)) {
    // Create the new getter which returns value.
    newDescriptor.get = (): T => value;

    // Create the new setter which is undefined in case `writable` is false.
    newDescriptor.set = writable ? createSetter<T>(property) : undefined;
  }

  // Returns the new descriptor.
  return newDescriptor;
}
