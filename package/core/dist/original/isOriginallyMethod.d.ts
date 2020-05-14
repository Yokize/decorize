/**
 * Determine whether the property is originally described as method.
 * Decorator can change or define a completely new descriptor of the property
 * so in particular cases it is essential to determine the original type.
 * Logic working only with registered decorators.
 *
 * @param target The object which contains the property.
 * @param property The name of the property to check.
 * @return True/false in case originally described as method; undefined in case
 * not determined original type.
 */
export declare function isOriginallyMethod(target: object, property: PropertyKey): boolean;
