/**
 * Add `property` to the `target` or change the attributes of an existing `property`.
 *
 * @param target The object in which to add or modify the property.
 * @param property The name of the property to be added or modified.
 * @param descriptor The descriptor which determine the property.
 * @return True in case operation is successful; false otherwise.
 * @throws TypeError in case of target type violation.
 */
export declare function defineProperty(target: object, property: PropertyKey, descriptor: PropertyDescriptor): boolean;
