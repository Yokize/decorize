/**
 * The resolver to create the default key.
 */
export const resolver: Resolver = (): any => 'default';

/**
 * Resolver is a plain function that used to generate the key to
 * store and access the cached value. Arguments can be used to
 * create argument-dependent keys.
 */
export type Resolver = (...args: any[]) => any;
