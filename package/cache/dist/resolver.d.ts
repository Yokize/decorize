/**
 * The resolver to create the default key.
 */
export declare const resolver: Resolver;
/**
 * Resolver is a plain function that used to generate the key to
 * store and access the cached value. Arguments can be used to
 * create argument-dependent keys.
 */
export declare type Resolver = (...args: any[]) => any;
