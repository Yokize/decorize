/**
 * Removes the given `property` from the `target`.
 *
 * @param target The object from which to delete the property.
 * @param property The name of the property to be deleted.
 * @return True in case operation is successful; false otherwise.
 * @throws TypeError in case of target type violation.
 */
export declare function deleteProperty(target: object, property: PropertyKey): boolean;
