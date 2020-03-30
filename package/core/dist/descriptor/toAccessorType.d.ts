/**
 * Create the property accessor type descriptor based on
 * existing attributes.
 *
 * @param property Property.
 * @param attributes Attributes.
 * @return Accessor descriptor.
 */
export declare function toAccessorType<T = any>(property: PropertyKey, attributes: PropertyDescriptor): PropertyDescriptor;
