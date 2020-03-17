/**
 * Structure of storage which segmented to store metadata
 * at the object or property.
 */
export interface Storage {
    root: any;
    prop: any;
}
/**
 * Create storage and assign it directly to the object.
 *
 * @param target Object to which assign storage.
 * @return Created and assigned storage.
 */
export declare function createStorage(target: object): Storage;
/**
 * Determine whether storage directly defined on the object.
 *
 * @param target Object on which to check storage existence.
 * @return True in case storage defined; false otherwise.
 */
export declare function hasStorage(target: object): boolean;
/**
 * Get storage which directly defined on the object.
 *
 * @param target Object from which to get storage.
 * @return Storage; null in case non exist.
 */
export declare function getStorage(target: object): Storage | undefined;
/**
 * Get or create storage directly on the object.
 *
 * @param target Object which contains storage.
 * @return Storage defined at the object.
 */
export declare function getOrCreateStorage(target: object): Storage;
