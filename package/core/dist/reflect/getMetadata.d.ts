/**
 * Get the metadata associated with object or its prototype chain.
 *
 * @param key Key used to retrieve metadata.
 * @param target Object associated with metadata.
 * @return Metadata for the key when found; undefined otherwise.
 */
export declare function getMetadata(key: any, target: object): any;
/**
 * Get the metadata associated with property or its prototype chain.
 *
 * @param key Key used to retrieve metadata.
 * @param target Object which contains property.
 * @param property Property associated with metadata.
 * @return Metadata for the key when found; undefined otherwise.
 */
export declare function getMetadata(key: any, target: object, property: PropertyKey): any;
