/**
 * Define the metadata associated with the `target`.
 *
 * @param key The key used to store metadata.
 * @param value The value that contains metadata.
 * @param target The object to be associated with metadata.
 * @throws TypeError in case of target type violation.
 */
export declare function defineMetadata(key: any, value: any, target: object): void;
/**
 * Define the metadata associated with the `target` and `property`.
 *
 * @param key The key used to store metadata.
 * @param value The value that contains metadata.
 * @param target The object to be associated with metadata.
 * @param property The property to be associated with metadata.
 * @throws TypeError in case of target type violation.
 */
export declare function defineMetadata(key: any, value: any, target: object, property: PropertyKey): void;
