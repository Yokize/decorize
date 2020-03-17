/**
 * Get unique identifier of the decorator.
 */
export declare function getDecoratorId(): string;
/**
 * Determine whether the bound method is cached.
 *
 * @param target Class (prototype).
 * @param property Method name.
 * @return True in case the method is cached; false otherwise.
 */
export declare function hasBoundMethod(target: object, property: PropertyKey): boolean;
/**
 * Set the bound method to the cache.
 *
 * @param target Class (prototype).
 * @param property Method name.
 * @param boundFn Bound method.
 */
export declare function setBoundMethod(target: object, property: PropertyKey, boundFn: Function): void;
/**
 * Get the bound method from the cache.
 *
 * @param target Class (prototype).
 * @param property Method name.
 * @return Bound method.
 */
export declare function getBoundMethod(target: object, property: PropertyKey): Function;
/**
 * Throw error in case the decorator used incorrectly.
 */
export declare function throwIncorrectUsage(): never;
