/**
 * Get the names and symbols of the object's own properties.
 *
 * @param target Object from which to get own keys.
 * @return Names or symbols of the own properties of an object.
 * @throws TypeError in case of non-object target.
 */
export declare function getOwnKeys(target: object): PropertyKey[];
