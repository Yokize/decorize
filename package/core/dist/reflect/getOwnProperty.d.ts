/**
 * Get the value under own `property` from the `target`.
 *
 * @param target The object in which to look for the property.
 * @param property The name of the property used to look up.
 * @return The retrieved value; undefined otherwise.
 * @throws TypeError in case of target type violation.
 */
export declare function getOwnProperty(target: object, property: PropertyKey): any;
