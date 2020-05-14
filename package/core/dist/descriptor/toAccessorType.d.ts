/**
 * Create the property accessor type descriptor based on
 * specified attributes.
 *
 * @param property Property name.
 * @param attributes Base descriptor attributes.
 * @return Newly created accessor descriptor.
 */
export declare function toAccessorType<T = any>(property: PropertyKey, attributes: PropertyDescriptor): PropertyDescriptor;
