/**
 * Create the default setter for the `property`.
 *
 * @param property Property name.
 * @return Newly created setter of the property.
 */
export declare function createSetter<T>(property: PropertyKey): (value: T) => void;
