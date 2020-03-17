/**
 * Custom logic to define the metadata on the object.
 *
 * @param key Key used to store and retrieve metadata.
 * @param value Value which contains metadata.
 * @param target Object on which to define metadata.
 */
export declare function defineInStorage(key: any, value: any, target: object): void;
/**
 * Custom logic to define the metadata associated with property on the object.
 *
 * @param key Key used to store and retrieve metadata.
 * @param value Value which contains metadata.
 * @param target Object on which to define metadata.
 * @param property Property to be associated with metadata.
 */
export declare function defineInStorage(key: any, value: any, target: object, property: PropertyKey): void;
