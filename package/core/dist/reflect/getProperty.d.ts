/**
 * Get the value under the `property` from the `target` or its prototype chain.
 *
 * @param target The object in which to look for the property.
 * @param property The name of the property used to look up.
 * @return The retrieved value; undefined otherwise.
 * @throws TypeError in case of target type violation.
 */
export declare function getProperty(target: object, property: PropertyKey): any;
