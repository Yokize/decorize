import isObject from 'lodash/isObject';

/* istanbul ignore next */
const ReflectBuiltIn: any = Reflect?.getOwnPropertyDescriptor;

/**
 * Reflect and Object build-in function returns a descriptor of the given `property`
 * if it exists, otherwise undefined.
 */
const _getOwnPropertyDescriptor: (target: object, property: PropertyKey) => PropertyDescriptor | undefined =
  ReflectBuiltIn ??
  function getOwnPropertyDescriptorFk(target: object, property: PropertyKey): PropertyDescriptor | undefined {
    if (isObject(target)) return Object.getOwnPropertyDescriptor(target, property);
    else throw new TypeError('Property descriptor can be retrieved only from the object');
  };

/**
 * Get own `property` descriptor from the `target`.
 *
 * @param target The object in which to look for the property.
 * @param property The name of the property used to retrieve a descriptor.
 * @return Property descriptor; undefined in case the property not defined.
 * @throws TypeError in case of target type violation.
 */
export function getOwnPropertyDescriptor(target: object, property: PropertyKey): PropertyDescriptor | undefined {
  return _getOwnPropertyDescriptor(target, property);
}
