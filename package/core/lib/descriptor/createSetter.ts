/**
 * Create the default setter for the `property`.
 *
 * @param property Property name.
 * @return Newly created setter of the property.
 */
export function createSetter<T>(property: PropertyKey): (value: T) => void {
  // Create setter for the property.
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
