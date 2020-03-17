/**
 * Define the metadata associated with object.
 *
 * @param key Key used to store and retrieve metadata.
 * @param value Value which contains metadata.
 * @param target Object to be associated with metadata.
 * @throws TypeError in case of non-object target.
 */
export declare function defineMetadata(key: any, value: any, target: object): void;
/**
 * Define the metadata associated with property.
 *
 * @param key Key used to store and retrieve metadata.
 * @param value Value which contains metadata.
 * @param target Object which contains property.
 * @param property Property to be associated with metadata.
 * @throws TypeError in case of non-object target.
 */
export declare function defineMetadata(key: any, value: any, target: object, property: PropertyKey): void;
