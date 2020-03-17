/**
 * Delete the metadata associated with object.
 *
 * @param key Key used to find and remove metadata.
 * @param target Object associated with metadata.
 * @return True in case the metadata has been found and deleted; false otherwise.
 * @throws TypeError in case of non-object target.
 */
export declare function deleteMetadata(key: any, target: object): boolean;
/**
 * Delete the metadata associated with property.
 *
 * @param key Key used to find and remove metadata.
 * @param target Object which contains property.
 * @param property Property associated with metadata.
 * @return True in case the metadata has been found and deleted; false otherwise.
 * @throws TypeError in case of non-object target.
 */
export declare function deleteMetadata(key: any, target: object, property: PropertyKey): boolean;
