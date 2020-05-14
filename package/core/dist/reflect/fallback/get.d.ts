/**
 * Custom logic to get the metadata from the `target` storage.
 * Does not include checking for the existence of metadata as this is done
 * at the higher level with appropriate processing.
 *
 * @param key The key used to retrieve metadata.
 * @param target The object on which the metadata is defined.
 * @return Metadata under the key in case its found; undefined otherwise.
 */
export declare function getFromStorage(key: any, target: object): any;
/**
 * Custom logic to get the metadata from the `target` and `property` storage.
 * Does not include checking for the existence of metadata as this is done
 * at the higher level with appropriate processing.
 *
 * @param key The key used to retrieve metadata.
 * @param target The object on which the metadata is defined.
 * @param property The property to be associated with metadata.
 * @return Metadata under the key in case its found; undefined otherwise.
 */
export declare function getFromStorage(key: any, target: object, property: PropertyKey): any;
