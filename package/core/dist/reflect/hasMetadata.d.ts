/**
 * Determine whether the metadata associated with the `target` or its
 * prototype chain is defined.
 *
 * @param key The key used to retrieve metadata.
 * @param target The object associated with metadata.
 * @return True in case the metadata defined; false otherwise.
 */
export declare function hasMetadata(key: any, target: object): boolean;
/**
 * Determine whether the metadata associated with the `target` and `property`
 * or its prototype chain is defined.
 *
 * @param key The key used to retrieve metadata.
 * @param target The object associated with metadata.
 * @param property The property associated with metadata.
 * @return True in case the metadata defined; false otherwise.
 */
export declare function hasMetadata(key: any, target: object, property: PropertyKey): boolean;
