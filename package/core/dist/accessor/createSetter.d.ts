/**
 * Create setter for the property.
 *
 * @param property Property name.
 * @return Newly created setter.
 */
export declare function createSetter<T>(property: PropertyKey): (value: T) => void;
