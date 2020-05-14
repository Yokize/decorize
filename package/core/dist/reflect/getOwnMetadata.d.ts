/**
 * Get the metadata associated with `target`.
 *
 * @param key The key used to retrieve metadata.
 * @param target The object associated with metadata.
 * @return Metadata for the key when found; undefined otherwise.
 */
export declare function getOwnMetadata(key: any, target: object): any;
/**
 * Get the metadata associated with `target` and `property`.
 *
 * @param key The key used to retrieve metadata.
 * @param target The object associated with metadata.
 * @param property The property associated with metadata.
 * @return Metadata for the key when found; undefined otherwise.
 */
export declare function getOwnMetadata(key: any, target: object, property: PropertyKey): any;
