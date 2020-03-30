import isObject from 'lodash/isObject';

/* istanbul ignore next */
const builtInReflect: any = Reflect?.deleteProperty;

/**
 * Reflect deletes the property from the object and behave identical to
 * non-strict delete operator. Exceptional case is aligned and violation
 * of target type throws a TypeError.
 */
const _deleteProperty: (target: object, property: PropertyKey) => boolean =
  builtInReflect ??
  function deletePropertyFk(target: object, property: PropertyKey): boolean {
    // Verify whether target is object.
    if (isObject(target))
      try {
        return Object.hasOwnProperty.call(target, property) ? delete target[property] : false;
      } catch {
        return false;
      }
    else throw new TypeError('Property can be deleted only from the object');
  };

/**
 * Removes a given property from an object.
 *
 * @param target Object from which to delete the property.
 * @param property Name of the property to be deleted.
 * @return True in case operation is successful; false otherwise.
 * @throws TypeError in case of non-object target.
 */
export function deleteProperty(target: object, property: PropertyKey): boolean {
  return _deleteProperty(target, property);
}
