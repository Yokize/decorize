/**
 * Add property to an object or change the attributes of existing property.
 *
 * @param target Object in which to add or modify the property.
 * @param property Name of the property to be added or modified.
 * @param descriptor Descriptor for the property.
 * @return True in case operation is successful; false otherwise.
 * @throws TypeError in case of non-object target.
 */
export declare function defineProperty(target: object, property: PropertyKey, descriptor: PropertyDescriptor): boolean;
