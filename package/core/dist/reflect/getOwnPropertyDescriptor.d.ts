/**
 * Get own `property` descriptor from the `target`.
 *
 * @param target The object in which to look for the property.
 * @param property The name of the property used to retrieve a descriptor.
 * @return Property descriptor; undefined in case the property not defined.
 * @throws TypeError in case of target type violation.
 */
export declare function getOwnPropertyDescriptor(target: object, property: PropertyKey): PropertyDescriptor | undefined;
