"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var isObject_1 = __importDefault(require("lodash/isObject"));
/* istanbul ignore next */
var builtInReflect = Reflect === null || Reflect === void 0 ? void 0 : Reflect.get;
/**
 * Reflect function works like getting a property from the object.
 */
var _getProperty = builtInReflect !== null && builtInReflect !== void 0 ? builtInReflect : function getPropertyFk(target, property) {
    // Verify whether target is object.
    if (isObject_1.default(target))
        // Get from object or prototype chain.
        return target[property];
    else
        throw new TypeError('Property can be retrieved only from the object');
};
/**
 * Get value under the property from the object or its prototype chain.
 *
 * @param target Object in which to look for the property.
 * @param property Name of the property to find.
 * @return Retrieved property value; undefined otherwise.
 */
function getProperty(target, property) {
    return _getProperty(target, property);
}
exports.getProperty = getProperty;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0UHJvcGVydHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvcmVmbGVjdC9nZXRQcm9wZXJ0eS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDZEQUF1QztBQUV2QywwQkFBMEI7QUFDMUIsSUFBTSxjQUFjLEdBQVEsT0FBTyxhQUFQLE9BQU8sdUJBQVAsT0FBTyxDQUFFLEdBQUcsQ0FBQztBQUV6Qzs7R0FFRztBQUNILElBQU0sWUFBWSxHQUNoQixjQUFjLGFBQWQsY0FBYyxjQUFkLGNBQWMsR0FDZCxTQUFTLGFBQWEsQ0FBQyxNQUFjLEVBQUUsUUFBcUI7SUFDMUQsbUNBQW1DO0lBQ25DLElBQUksa0JBQVEsQ0FBQyxNQUFNLENBQUM7UUFDbEIsc0NBQXNDO1FBQ3RDLE9BQU8sTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDOztRQUNyQixNQUFNLElBQUksU0FBUyxDQUFDLGdEQUFnRCxDQUFDLENBQUM7QUFDN0UsQ0FBQyxDQUFDO0FBRUo7Ozs7OztHQU1HO0FBQ0gsU0FBZ0IsV0FBVyxDQUFDLE1BQWMsRUFBRSxRQUFxQjtJQUMvRCxPQUFPLFlBQVksQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDeEMsQ0FBQztBQUZELGtDQUVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGlzT2JqZWN0IGZyb20gJ2xvZGFzaC9pc09iamVjdCc7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG5jb25zdCBidWlsdEluUmVmbGVjdDogYW55ID0gUmVmbGVjdD8uZ2V0O1xuXG4vKipcbiAqIFJlZmxlY3QgZnVuY3Rpb24gd29ya3MgbGlrZSBnZXR0aW5nIGEgcHJvcGVydHkgZnJvbSB0aGUgb2JqZWN0LlxuICovXG5jb25zdCBfZ2V0UHJvcGVydHk6ICh0YXJnZXQ6IG9iamVjdCwgcHJvcGVydHk6IFByb3BlcnR5S2V5KSA9PiBhbnkgPVxuICBidWlsdEluUmVmbGVjdCA/P1xuICBmdW5jdGlvbiBnZXRQcm9wZXJ0eUZrKHRhcmdldDogb2JqZWN0LCBwcm9wZXJ0eTogUHJvcGVydHlLZXkpOiBhbnkge1xuICAgIC8vIFZlcmlmeSB3aGV0aGVyIHRhcmdldCBpcyBvYmplY3QuXG4gICAgaWYgKGlzT2JqZWN0KHRhcmdldCkpXG4gICAgICAvLyBHZXQgZnJvbSBvYmplY3Qgb3IgcHJvdG90eXBlIGNoYWluLlxuICAgICAgcmV0dXJuIHRhcmdldFtwcm9wZXJ0eV07XG4gICAgZWxzZSB0aHJvdyBuZXcgVHlwZUVycm9yKCdQcm9wZXJ0eSBjYW4gYmUgcmV0cmlldmVkIG9ubHkgZnJvbSB0aGUgb2JqZWN0Jyk7XG4gIH07XG5cbi8qKlxuICogR2V0IHZhbHVlIHVuZGVyIHRoZSBwcm9wZXJ0eSBmcm9tIHRoZSBvYmplY3Qgb3IgaXRzIHByb3RvdHlwZSBjaGFpbi5cbiAqXG4gKiBAcGFyYW0gdGFyZ2V0IE9iamVjdCBpbiB3aGljaCB0byBsb29rIGZvciB0aGUgcHJvcGVydHkuXG4gKiBAcGFyYW0gcHJvcGVydHkgTmFtZSBvZiB0aGUgcHJvcGVydHkgdG8gZmluZC5cbiAqIEByZXR1cm4gUmV0cmlldmVkIHByb3BlcnR5IHZhbHVlOyB1bmRlZmluZWQgb3RoZXJ3aXNlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0UHJvcGVydHkodGFyZ2V0OiBvYmplY3QsIHByb3BlcnR5OiBQcm9wZXJ0eUtleSk6IGFueSB7XG4gIHJldHVybiBfZ2V0UHJvcGVydHkodGFyZ2V0LCBwcm9wZXJ0eSk7XG59XG4iXX0=