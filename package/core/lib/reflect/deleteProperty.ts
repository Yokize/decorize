import isObject from 'lodash/isObject';

/* istanbul ignore next */
const ReflectBuiltIn: any = Reflect?.deleteProperty;

/**
 * Reflect deletes the property from the `target` and behave identical to the
 * non-strict delete operator.
 */
const _deleteProperty: (target: object, property: PropertyKey) => boolean =
  ReflectBuiltIn ??
  function deletePropertyFk(target: object, property: PropertyKey): boolean {
    if (isObject(target))
      try {
        return Object.hasOwnProperty.call(target, property) ? delete target[property] : false;
      } catch {
        return false;
      }
    else throw new TypeError('Property can be deleted only from the object');
  };

/**
 * Removes the given `property` from the `target`.
 *
 * @param target The object from which to delete the property.
 * @param property The name of the property to be deleted.
 * @return True in case operation is successful; false otherwise.
 * @throws TypeError in case of target type violation.
 */
export function deleteProperty(target: object, property: PropertyKey): boolean {
  return _deleteProperty(target, property);
}
