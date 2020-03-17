/**
 * Get value under the property from the object or its prototype chain.
 *
 * @param target Object in which to look for the property.
 * @param property Name of the property to find.
 * @return Retrieved property value; undefined otherwise.
 */
export declare function getProperty(target: object, property: PropertyKey): any;
