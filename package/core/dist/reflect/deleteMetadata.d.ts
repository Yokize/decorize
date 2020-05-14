/**
 * Delete the metadata associated with the `target`.
 *
 * @param key The key used to retrieve metadata.
 * @param target The object associated with metadata.
 * @return True in case the metadata has been found and deleted; false otherwise.
 * @throws TypeError in case of target type violation.
 */
export declare function deleteMetadata(key: any, target: object): boolean;
/**
 * Delete the metadata associated with the `target` and `property`.
 *
 * @param key The key used to retrieve metadata.
 * @param target The object associated with metadata.
 * @param property The property associated with metadata.
 * @return True in case the metadata has been found and deleted; false otherwise.
 * @throws TypeError in case of target type violation.
 */
export declare function deleteMetadata(key: any, target: object, property: PropertyKey): boolean;
