/**
 * Determine whether the metadata associated with object is defined.
 *
 * @param key Key used to store and retrieve metadata.
 * @param target Object associated with metadata.
 * @return True in case the metadata defined; false otherwise.
 */
export declare function hasOwnMetadata(key: any, target: object): boolean;
/**
 * Determine whether the metadata associated with property is defined.
 *
 * @param key Key used to store and retrieve metadata.
 * @param target Object which contains property.
 * @param property Property associated with metadata.
 * @return True in case the metadata defined; false otherwise.
 */
export declare function hasOwnMetadata(key: any, target: object, property: PropertyKey): boolean;
