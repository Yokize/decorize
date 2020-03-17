/**
 * Custom logic to determine whether the metadata defined on the object.
 *
 * @param key Key used to store and retrieve metadata.
 * @param target Object on which the metadata is defined.
 * @return True in case the metadata defined; false otherwise.
 */
export declare function hasInStorage(key: any, target: object): boolean;
/**
 * Custom logic to determine whether the metadata associated with property
 * defined on the object.
 *
 * @param key Key used to store and retrieve metadata.
 * @param target Object on which the metadata is defined.
 * @param property Property associated with metadata.
 * @return True in case the metadata defined; false otherwise.
 */
export declare function hasInStorage(key: any, target: object, property: PropertyKey): boolean;
