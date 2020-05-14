/**
 * Custom logic to delete the metadata from the `target` storage.
 * Does not include checking for the existence of metadata as this is done
 * at the higher level with appropriate processing.
 *
 * @param key The key used to find and remove metadata.
 * @param target The object from which to remove metadata.
 * @return True in case the metadata has been found and deleted; false otherwise.
 */
export declare function deleteFromStorage(key: any, target: object): boolean;
/**
 * Custom logic to delete the metadata from the `target` and `property` storage.
 * Does not include checking for the existence of metadata as this is done
 * at the higher level with appropriate processing.
 *
 * @param key The key used to find and remove metadata.
 * @param target The object from which to remove metadata.
 * @param property The property to be associated with metadata.
 * @return True in case the metadata has been found and deleted; false otherwise.
 */
export declare function deleteFromStorage(key: any, target: object, property: PropertyKey): boolean;
