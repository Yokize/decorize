/**
 * Get proto of the object to support feature to access the metadata by chain.
 * Using built-in getPrototypeOf or custom logic to get the proto of the object.
 * Custom logic aligned with Reflect polyfill way of retrieving the prototype.
 *
 * @param target The object used to get the proto.
 * @return Prototype; null in case of non existing prototype.
 */
export declare function getProtoOf(target: any): object | undefined;
