"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var isObject_1 = __importDefault(require("lodash/isObject"));
/* istanbul ignore next */
var builtInReflect = Reflect === null || Reflect === void 0 ? void 0 : Reflect.has;
/**
 * Reflect works like the built-in `in` operator. Exceptional case is
 * aligned and violation of target type throws a TypeError.
 */
var _hasProperty = builtInReflect !== null && builtInReflect !== void 0 ? builtInReflect : function hasPropertyFk(target, property) {
    // Verify whether target is object.
    if (isObject_1.default(target))
        // Check on object or prototype chain.
        return property in target;
    else
        throw new TypeError('Existence of the property can be checked only on the object');
};
/**
 * Determine whether the object or its prototype chain has the property.
 *
 * @param target Object in which to look for the property.
 * @param property Name of the property to check.
 * @return True in case has the property; false otherwise.
 */
function hasProperty(target, property) {
    return _hasProperty(target, property);
}
exports.hasProperty = hasProperty;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFzUHJvcGVydHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvcmVmbGVjdC9oYXNQcm9wZXJ0eS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDZEQUF1QztBQUV2QywwQkFBMEI7QUFDMUIsSUFBTSxjQUFjLEdBQVEsT0FBTyxhQUFQLE9BQU8sdUJBQVAsT0FBTyxDQUFFLEdBQUcsQ0FBQztBQUV6Qzs7O0dBR0c7QUFDSCxJQUFNLFlBQVksR0FDaEIsY0FBYyxhQUFkLGNBQWMsY0FBZCxjQUFjLEdBQ2QsU0FBUyxhQUFhLENBQUMsTUFBYyxFQUFFLFFBQXFCO0lBQzFELG1DQUFtQztJQUNuQyxJQUFJLGtCQUFRLENBQUMsTUFBTSxDQUFDO1FBQ2xCLHNDQUFzQztRQUN0QyxPQUFPLFFBQVEsSUFBSSxNQUFNLENBQUM7O1FBQ3ZCLE1BQU0sSUFBSSxTQUFTLENBQUMsNkRBQTZELENBQUMsQ0FBQztBQUMxRixDQUFDLENBQUM7QUFFSjs7Ozs7O0dBTUc7QUFDSCxTQUFnQixXQUFXLENBQUMsTUFBYyxFQUFFLFFBQXFCO0lBQy9ELE9BQU8sWUFBWSxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQztBQUN4QyxDQUFDO0FBRkQsa0NBRUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgaXNPYmplY3QgZnJvbSAnbG9kYXNoL2lzT2JqZWN0JztcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbmNvbnN0IGJ1aWx0SW5SZWZsZWN0OiBhbnkgPSBSZWZsZWN0Py5oYXM7XG5cbi8qKlxuICogUmVmbGVjdCB3b3JrcyBsaWtlIHRoZSBidWlsdC1pbiBgaW5gIG9wZXJhdG9yLiBFeGNlcHRpb25hbCBjYXNlIGlzXG4gKiBhbGlnbmVkIGFuZCB2aW9sYXRpb24gb2YgdGFyZ2V0IHR5cGUgdGhyb3dzIGEgVHlwZUVycm9yLlxuICovXG5jb25zdCBfaGFzUHJvcGVydHk6ICh0YXJnZXQ6IG9iamVjdCwgcHJvcGVydHk6IFByb3BlcnR5S2V5KSA9PiBib29sZWFuID1cbiAgYnVpbHRJblJlZmxlY3QgPz9cbiAgZnVuY3Rpb24gaGFzUHJvcGVydHlGayh0YXJnZXQ6IG9iamVjdCwgcHJvcGVydHk6IFByb3BlcnR5S2V5KTogYm9vbGVhbiB7XG4gICAgLy8gVmVyaWZ5IHdoZXRoZXIgdGFyZ2V0IGlzIG9iamVjdC5cbiAgICBpZiAoaXNPYmplY3QodGFyZ2V0KSlcbiAgICAgIC8vIENoZWNrIG9uIG9iamVjdCBvciBwcm90b3R5cGUgY2hhaW4uXG4gICAgICByZXR1cm4gcHJvcGVydHkgaW4gdGFyZ2V0O1xuICAgIGVsc2UgdGhyb3cgbmV3IFR5cGVFcnJvcignRXhpc3RlbmNlIG9mIHRoZSBwcm9wZXJ0eSBjYW4gYmUgY2hlY2tlZCBvbmx5IG9uIHRoZSBvYmplY3QnKTtcbiAgfTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgd2hldGhlciB0aGUgb2JqZWN0IG9yIGl0cyBwcm90b3R5cGUgY2hhaW4gaGFzIHRoZSBwcm9wZXJ0eS5cbiAqXG4gKiBAcGFyYW0gdGFyZ2V0IE9iamVjdCBpbiB3aGljaCB0byBsb29rIGZvciB0aGUgcHJvcGVydHkuXG4gKiBAcGFyYW0gcHJvcGVydHkgTmFtZSBvZiB0aGUgcHJvcGVydHkgdG8gY2hlY2suXG4gKiBAcmV0dXJuIFRydWUgaW4gY2FzZSBoYXMgdGhlIHByb3BlcnR5OyBmYWxzZSBvdGhlcndpc2UuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBoYXNQcm9wZXJ0eSh0YXJnZXQ6IG9iamVjdCwgcHJvcGVydHk6IFByb3BlcnR5S2V5KTogYm9vbGVhbiB7XG4gIHJldHVybiBfaGFzUHJvcGVydHkodGFyZ2V0LCBwcm9wZXJ0eSk7XG59XG4iXX0=