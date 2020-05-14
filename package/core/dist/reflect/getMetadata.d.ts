/**
 * Get the metadata associated with `target` or its prototype chain.
 *
 * @param key The key used to retrieve metadata.
 * @param target The object associated with metadata.
 * @return Metadata for the key when found; undefined otherwise.
 * @throws TypeError in case of target type violation.
 */
export declare function getMetadata(key: any, target: object): any;
/**
 * Get the metadata associated with `target` and `property` or its
 * prototype chain.
 *
 * @param key The key used to retrieve metadata.
 * @param target The object associated with metadata.
 * @param property The property associated with metadata.
 * @return Metadata for the key when found; undefined otherwise.
 * @throws TypeError in case of target type violation.
 */
export declare function getMetadata(key: any, target: object, property: PropertyKey): any;
