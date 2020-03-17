"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var isObject_1 = __importDefault(require("lodash/isObject"));
/* istanbul ignore next */
var builtInReflect = Reflect === null || Reflect === void 0 ? void 0 : Reflect.defineProperty;
/**
 * Reflect and Object built-in is differ in return value of operation. Object
 * built-in function returns the target object when its successful, otherwise
 * it throws a TypeError. Reflect returns the operation status. Fallback is
 * aligned to return boolean, which determine whether the execution is successful.
 * Exceptional case is aligned and violation of target type throws a TypeError.
 */
var _defineProperty = builtInReflect !== null && builtInReflect !== void 0 ? builtInReflect : function definePropertyFk(target, property, descriptor) {
    // Verify whether target is object.
    if (isObject_1.default(target))
        try {
            Object.defineProperty(target, property, descriptor);
            return true;
        }
        catch (_a) {
            return false;
        }
    else
        throw new TypeError('Property can be defined only on the object');
};
/**
 * Add property to an object or change the attributes of existing property.
 *
 * @param target Object in which to add or modify the property.
 * @param property Name of the property to be added or modified.
 * @param descriptor Descriptor for the property.
 * @return True in case operation is successful; false otherwise.
 * @throws TypeError in case of non-object target.
 */
function defineProperty(target, property, descriptor) {
    return _defineProperty(target, property, descriptor);
}
exports.defineProperty = defineProperty;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmaW5lUHJvcGVydHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvcmVmbGVjdC9kZWZpbmVQcm9wZXJ0eS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDZEQUF1QztBQUV2QywwQkFBMEI7QUFDMUIsSUFBTSxjQUFjLEdBQVEsT0FBTyxhQUFQLE9BQU8sdUJBQVAsT0FBTyxDQUFFLGNBQWMsQ0FBQztBQUVwRDs7Ozs7O0dBTUc7QUFDSCxJQUFNLGVBQWUsR0FDbkIsY0FBYyxhQUFkLGNBQWMsY0FBZCxjQUFjLEdBQ2QsU0FBUyxnQkFBZ0IsQ0FBQyxNQUFjLEVBQUUsUUFBcUIsRUFBRSxVQUE4QjtJQUM3RixtQ0FBbUM7SUFDbkMsSUFBSSxrQkFBUSxDQUFDLE1BQU0sQ0FBQztRQUNsQixJQUFJO1lBQ0YsTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1lBQ3BELE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFBQyxXQUFNO1lBQ04sT0FBTyxLQUFLLENBQUM7U0FDZDs7UUFDRSxNQUFNLElBQUksU0FBUyxDQUFDLDRDQUE0QyxDQUFDLENBQUM7QUFDekUsQ0FBQyxDQUFDO0FBRUo7Ozs7Ozs7O0dBUUc7QUFDSCxTQUFnQixjQUFjLENBQUMsTUFBYyxFQUFFLFFBQXFCLEVBQUUsVUFBOEI7SUFDbEcsT0FBTyxlQUFlLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxVQUFVLENBQUMsQ0FBQztBQUN2RCxDQUFDO0FBRkQsd0NBRUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgaXNPYmplY3QgZnJvbSAnbG9kYXNoL2lzT2JqZWN0JztcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbmNvbnN0IGJ1aWx0SW5SZWZsZWN0OiBhbnkgPSBSZWZsZWN0Py5kZWZpbmVQcm9wZXJ0eTtcblxuLyoqXG4gKiBSZWZsZWN0IGFuZCBPYmplY3QgYnVpbHQtaW4gaXMgZGlmZmVyIGluIHJldHVybiB2YWx1ZSBvZiBvcGVyYXRpb24uIE9iamVjdFxuICogYnVpbHQtaW4gZnVuY3Rpb24gcmV0dXJucyB0aGUgdGFyZ2V0IG9iamVjdCB3aGVuIGl0cyBzdWNjZXNzZnVsLCBvdGhlcndpc2VcbiAqIGl0IHRocm93cyBhIFR5cGVFcnJvci4gUmVmbGVjdCByZXR1cm5zIHRoZSBvcGVyYXRpb24gc3RhdHVzLiBGYWxsYmFjayBpc1xuICogYWxpZ25lZCB0byByZXR1cm4gYm9vbGVhbiwgd2hpY2ggZGV0ZXJtaW5lIHdoZXRoZXIgdGhlIGV4ZWN1dGlvbiBpcyBzdWNjZXNzZnVsLlxuICogRXhjZXB0aW9uYWwgY2FzZSBpcyBhbGlnbmVkIGFuZCB2aW9sYXRpb24gb2YgdGFyZ2V0IHR5cGUgdGhyb3dzIGEgVHlwZUVycm9yLlxuICovXG5jb25zdCBfZGVmaW5lUHJvcGVydHk6ICh0YXJnZXQ6IG9iamVjdCwgcHJvcGVydHk6IFByb3BlcnR5S2V5LCBkZXNjcmlwdG9yOiBQcm9wZXJ0eURlc2NyaXB0b3IpID0+IGJvb2xlYW4gPVxuICBidWlsdEluUmVmbGVjdCA/P1xuICBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eUZrKHRhcmdldDogb2JqZWN0LCBwcm9wZXJ0eTogUHJvcGVydHlLZXksIGRlc2NyaXB0b3I6IFByb3BlcnR5RGVzY3JpcHRvcik6IGJvb2xlYW4ge1xuICAgIC8vIFZlcmlmeSB3aGV0aGVyIHRhcmdldCBpcyBvYmplY3QuXG4gICAgaWYgKGlzT2JqZWN0KHRhcmdldCkpXG4gICAgICB0cnkge1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBwcm9wZXJ0eSwgZGVzY3JpcHRvcik7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSBjYXRjaCB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICBlbHNlIHRocm93IG5ldyBUeXBlRXJyb3IoJ1Byb3BlcnR5IGNhbiBiZSBkZWZpbmVkIG9ubHkgb24gdGhlIG9iamVjdCcpO1xuICB9O1xuXG4vKipcbiAqIEFkZCBwcm9wZXJ0eSB0byBhbiBvYmplY3Qgb3IgY2hhbmdlIHRoZSBhdHRyaWJ1dGVzIG9mIGV4aXN0aW5nIHByb3BlcnR5LlxuICpcbiAqIEBwYXJhbSB0YXJnZXQgT2JqZWN0IGluIHdoaWNoIHRvIGFkZCBvciBtb2RpZnkgdGhlIHByb3BlcnR5LlxuICogQHBhcmFtIHByb3BlcnR5IE5hbWUgb2YgdGhlIHByb3BlcnR5IHRvIGJlIGFkZGVkIG9yIG1vZGlmaWVkLlxuICogQHBhcmFtIGRlc2NyaXB0b3IgRGVzY3JpcHRvciBmb3IgdGhlIHByb3BlcnR5LlxuICogQHJldHVybiBUcnVlIGluIGNhc2Ugb3BlcmF0aW9uIGlzIHN1Y2Nlc3NmdWw7IGZhbHNlIG90aGVyd2lzZS5cbiAqIEB0aHJvd3MgVHlwZUVycm9yIGluIGNhc2Ugb2Ygbm9uLW9iamVjdCB0YXJnZXQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eSh0YXJnZXQ6IG9iamVjdCwgcHJvcGVydHk6IFByb3BlcnR5S2V5LCBkZXNjcmlwdG9yOiBQcm9wZXJ0eURlc2NyaXB0b3IpOiBib29sZWFuIHtcbiAgcmV0dXJuIF9kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIHByb3BlcnR5LCBkZXNjcmlwdG9yKTtcbn1cbiJdfQ==