/**
 * Get the names and symbols of the `target` own properties.
 *
 * @param target The object from which to get own keys.
 * @return Names or symbols of the own properties of the object.
 * @throws TypeError in case of target type violation.
 */
export declare function getOwnKeys(target: object): PropertyKey[];
