/**
 * Get own property descriptor of the object.
 *
 * @param target Object in which to look for the property.
 * @param property Name of the property to find and retrieve descriptor.
 * @return Descriptor for the property; undefined in case property not defined.
 * @throws TypeError in case of non-object target.
 */
export declare function getOwnPropertyDescriptor(target: object, property: PropertyKey): PropertyDescriptor | undefined;
