import isFunction from 'lodash/isFunction';

/**
 * Determine whether the classes or classes of instances are equal.
 *
 * @param class1 Class or instance to be checked.
 * @param class2 Class or instance to be checked.
 * @return True in case are equal; false otherwise.
 */
export function isEqualClass(class1: object, class2: object): boolean {
  return isFunction(class1)
    ? isFunction(class2)
      ? class1 === class2
      : class1 === class2.constructor
    : isFunction(class2)
    ? class1.constructor === class2
    : class1.constructor === class2.constructor;
}
