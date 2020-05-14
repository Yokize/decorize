/**
 * The interface describes the structure of the storage, which
 * segmented to store metadata at the object or property.
 */
export interface Storage {
    root: any;
    prop: any;
}
/**
 * Create the storage and assign it directly to the object.
 *
 * @param target The object to which the storage should be assigned.
 * @return The storage is created and assigned to the object.
 */
export declare function createStorage(target: object): Storage;
/**
 * Get the storage which directly defined on the object.
 *
 * @param target The object from which to get the storage.
 * @return The storage; null in case non exist.
 */
export declare function getStorage(target: object): Storage | undefined;
/**
 * Get or create the storage directly on the object.
 *
 * @param target The object from which to get the storage.
 * @return The storage defined at the object.
 */
export declare function getOrCreateStorage(target: object): Storage;
