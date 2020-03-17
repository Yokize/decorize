import isObject from 'lodash/isObject';

/* istanbul ignore next */
const builtInReflect: any = Reflect?.getOwnPropertyDescriptor;

/**
 * Reflect and Object build-in function returns a descriptor of the given property
 * if it exists, undefined otherwise. Exceptional case is aligned and violation of
 * target type throws a TypeError.
 */
const _getOwnPropertyDescriptor: (target: object, property: PropertyKey) => PropertyDescriptor | undefined =
  builtInReflect ??
  function getOwnPropertyDescriptorFk(target: object, property: PropertyKey): PropertyDescriptor | undefined {
    // Verify whether target is object.
    if (isObject(target))
      // Use built-in helper to get own property descriptor.
      return Object.getOwnPropertyDescriptor(target, property);
    else throw new TypeError('Property descriptor can be retrieved only from the object');
  };

/**
 * Get own property descriptor of the object.
 *
 * @param target Object in which to look for the property.
 * @param property Name of the property to find and retrieve descriptor.
 * @return Descriptor for the property; undefined in case property not defined.
 * @throws TypeError in case of non-object target.
 */
export function getOwnPropertyDescriptor(target: object, property: PropertyKey): PropertyDescriptor | undefined {
  return _getOwnPropertyDescriptor(target, property);
}
