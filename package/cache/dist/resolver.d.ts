/**
 * Default resolver used by decorators.
 */
export declare const resolver: Resolver;
/**
 * Resolver is plain function that used to generate the key to
 * store and access the cached value. Arguments can be used to
 * create argument-dependent keys.
 */
export declare type Resolver = (...args: any[]) => any;
