import isBoolean from 'lodash/isBoolean';

/**
 * Create setter for the property.
 *
 * @param property Property name.
 * @return Newly created setter.
 */
function createSetter<T>(property: PropertyKey): (value: T) => void {
  // Property setter.
  return function set(this: any, value: T): void {
    // Re-define the property on set.
    Object.defineProperty(this, property, {
      value,
      configurable: true,
      enumerable: true,
      writable: true
    });
  };
}

/**
 * Create the property accessor type descriptor based on
 * existing attributes.
 *
 * @param property Property.
 * @param attributes Attributes.
 * @return Accessor descriptor.
 */
export function toAccessorType<T = any>(property: PropertyKey, attributes: PropertyDescriptor): PropertyDescriptor {
  // Create the new descriptor which contains `configurable` and `enumerable`
  // attributes.
  const { get, set, value, writable, ...newDescriptor }: any = attributes;

  // Reuse the setter.
  newDescriptor.set = set;

  // Reuse the getter.
  newDescriptor.get = get;

  // Determine whether the `writable` is defined.
  if (isBoolean(writable)) {
    // Create the new getter which returns value.
    newDescriptor.get = (): T => value;

    // Create the new setter which is undefined in case `writable` is false.
    newDescriptor.set = writable ? createSetter<T>(property) : undefined;
  }

  // Returns the new descriptor.
  return newDescriptor;
}
