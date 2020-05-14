/**
 * Custom logic to determine whether the metadata defined on the `target`
 * storage.
 *
 * @param key The key used to retrieve metadata.
 * @param target The object on which the metadata is defined.
 * @return True in case the metadata defined; false otherwise.
 */
export declare function hasInStorage(key: any, target: object): boolean;
/**
 * Custom logic to determine whether the metadata defined on the `target`
 * and `property` storage.
 *
 * @param key The key used to retrieve metadata.
 * @param target The object on which the metadata is defined.
 * @param property The property to be associated with metadata.
 * @return True in case the metadata defined; false otherwise.
 */
export declare function hasInStorage(key: any, target: object, property: PropertyKey): boolean;
