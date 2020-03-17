/**
 * Determine whether the property is originally described as accessors.
 * Decorator can change or define a completely new descriptor of the property
 * so in particular cases it is essential to determine the original type.
 * Logic working only with registered decorators.
 *
 * @param target Object which contain property.
 * @param property Property name.
 * @return True/false in case originally described via accessors; undefined in case
 * not determined original type.
 */
export declare function isOriginallyAccessor(target: object, property: PropertyKey): boolean;
