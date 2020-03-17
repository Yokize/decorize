/**
 * Default resolver used by decorators.
 */
export const resolver: Resolver = (): any => 'default';

/**
 * Resolver is plain function that used to generate the key to
 * store and access the cached value. Arguments can be used to
 * create argument-dependent keys.
 */
export type Resolver = (...args: any[]) => any;
