/**
 * Determine whether the metadata associated with object or its
 * prototype chain is defined.
 *
 * @param key Key used to store and retrieve metadata.
 * @param target Object associated with metadata.
 * @return True in case the metadata defined; false otherwise.
 */
export declare function hasMetadata(key: any, target: object): boolean;
/**
 * Determine whether the metadata associated with property or its
 * prototype chain is defined.
 *
 * @param key Key used to store and retrieve metadata.
 * @param target Object which contains property.
 * @param property Property associated with metadata.
 * @return True in case the metadata defined; false otherwise.
 */
export declare function hasMetadata(key: any, target: object, property: PropertyKey): boolean;
