/**
 * Determine whether the `target` or its prototype chain has the `property`.
 *
 * @param target The object in which to look for the property.
 * @param property The name of the property to check.
 * @return True in case has the property; false otherwise.
 * @throws TypeError in case of target type violation.
 */
export declare function hasProperty(target: object, property: PropertyKey): boolean;
