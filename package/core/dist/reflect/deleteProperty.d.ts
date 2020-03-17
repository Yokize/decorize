/**
 * Removes a given property from an object.
 *
 * @param target Object from which to delete the property.
 * @param property Name of the property to be deleted.
 * @return True in case operation is successful; false otherwise.
 * @throws TypeError in case of non-object target.
 */
export declare function deleteProperty(target: object, property: PropertyKey): boolean;
