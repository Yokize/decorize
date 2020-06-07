import isObject from 'lodash/isObject';
import isFunction from 'lodash/isFunction';

/**
 * Get the name of the class or its instance.
 *
 * @param target Class (instance).
 * @return Retrieved name; undefined otherwise.
 */
export function getClassName(target: any): string | undefined {
  if (isFunction(target))
    // Returns the name of the class (support of older specification).
    return target.name ?? target.toString().match(/function\s*([^\s(]+)/)[1];
  else if (isObject(target)) return getClassName(target.constructor);
}
