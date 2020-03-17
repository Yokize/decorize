/**
 * Get value under own property from the object.
 *
 * @param target Object in which to look for the property.
 * @param property Name of the property to find.
 * @return Retrieved property value; undefined otherwise.
 * @throws TypeError in case of non-object target.
 */
export declare function getOwnProperty(target: object, property: PropertyKey): any;
