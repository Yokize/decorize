/**
 * Decorator can change or define a completely new descriptor of the
 * property so sometimes its important to determine original type.
 * Original type used for an advanced and accurate decoration.
 */
export declare enum OriginalType {
    Method = "method",
    Property = "property",
    Accessor = "accessor"
}
/**
 * Determine original type based on already registered decorators.
 * In case decorator change descriptor without registering itself
 * its not possible to determine original type.
 *
 * @param target The class on which decorators are registered.
 * @param property The property for which to get the original type.
 * @return The original type; undefined otherwise.
 */
export declare function getOriginalType(target: object, property: PropertyKey): OriginalType | undefined;
