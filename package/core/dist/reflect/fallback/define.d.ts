/**
 * Custom logic to define the metadata on the `target` storage.
 *
 * @param key The key used to store metadata.
 * @param value The value that contains metadata.
 * @param target The object on which to define metadata.
 */
export declare function defineInStorage(key: any, value: any, target: object): void;
/**
 * Custom logic to define the metadata on the `target` and `property` storage.
 *
 * @param key The key used to store metadata.
 * @param value The value that contains metadata.
 * @param target The object on which to define metadata.
 * @param property The property to be associated with metadata.
 */
export declare function defineInStorage(key: any, value: any, target: object, property: PropertyKey): void;
