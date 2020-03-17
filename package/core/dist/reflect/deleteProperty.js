"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var isObject_1 = __importDefault(require("lodash/isObject"));
var hasOwnProperty_1 = require("./hasOwnProperty");
/* istanbul ignore next */
var builtInReflect = Reflect === null || Reflect === void 0 ? void 0 : Reflect.deleteProperty;
/**
 * Reflect deletes the property from the object and behave identical to
 * non-strict delete operator. Exceptional case is aligned and violation
 * of target type throws a TypeError.
 */
var _deleteProperty = builtInReflect !== null && builtInReflect !== void 0 ? builtInReflect : function deletePropertyFk(target, property) {
    // Verify whether target is object.
    if (isObject_1.default(target))
        try {
            return hasOwnProperty_1.hasOwnProperty(target, property) ? delete target[property] : false;
        }
        catch (_a) {
            return false;
        }
    else
        throw new TypeError('Property can be deleted only from the object');
};
/**
 * Removes a given property from an object.
 *
 * @param target Object from which to delete the property.
 * @param property Name of the property to be deleted.
 * @return True in case operation is successful; false otherwise.
 * @throws TypeError in case of non-object target.
 */
function deleteProperty(target, property) {
    return _deleteProperty(target, property);
}
exports.deleteProperty = deleteProperty;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVsZXRlUHJvcGVydHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvcmVmbGVjdC9kZWxldGVQcm9wZXJ0eS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDZEQUF1QztBQUN2QyxtREFBa0Q7QUFFbEQsMEJBQTBCO0FBQzFCLElBQU0sY0FBYyxHQUFRLE9BQU8sYUFBUCxPQUFPLHVCQUFQLE9BQU8sQ0FBRSxjQUFjLENBQUM7QUFFcEQ7Ozs7R0FJRztBQUNILElBQU0sZUFBZSxHQUNuQixjQUFjLGFBQWQsY0FBYyxjQUFkLGNBQWMsR0FDZCxTQUFTLGdCQUFnQixDQUFDLE1BQWMsRUFBRSxRQUFxQjtJQUM3RCxtQ0FBbUM7SUFDbkMsSUFBSSxrQkFBUSxDQUFDLE1BQU0sQ0FBQztRQUNsQixJQUFJO1lBQ0YsT0FBTywrQkFBYyxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztTQUMzRTtRQUFDLFdBQU07WUFDTixPQUFPLEtBQUssQ0FBQztTQUNkOztRQUNFLE1BQU0sSUFBSSxTQUFTLENBQUMsOENBQThDLENBQUMsQ0FBQztBQUMzRSxDQUFDLENBQUM7QUFFSjs7Ozs7OztHQU9HO0FBQ0gsU0FBZ0IsY0FBYyxDQUFDLE1BQWMsRUFBRSxRQUFxQjtJQUNsRSxPQUFPLGVBQWUsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDM0MsQ0FBQztBQUZELHdDQUVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGlzT2JqZWN0IGZyb20gJ2xvZGFzaC9pc09iamVjdCc7XG5pbXBvcnQgeyBoYXNPd25Qcm9wZXJ0eSB9IGZyb20gJy4vaGFzT3duUHJvcGVydHknO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuY29uc3QgYnVpbHRJblJlZmxlY3Q6IGFueSA9IFJlZmxlY3Q/LmRlbGV0ZVByb3BlcnR5O1xuXG4vKipcbiAqIFJlZmxlY3QgZGVsZXRlcyB0aGUgcHJvcGVydHkgZnJvbSB0aGUgb2JqZWN0IGFuZCBiZWhhdmUgaWRlbnRpY2FsIHRvXG4gKiBub24tc3RyaWN0IGRlbGV0ZSBvcGVyYXRvci4gRXhjZXB0aW9uYWwgY2FzZSBpcyBhbGlnbmVkIGFuZCB2aW9sYXRpb25cbiAqIG9mIHRhcmdldCB0eXBlIHRocm93cyBhIFR5cGVFcnJvci5cbiAqL1xuY29uc3QgX2RlbGV0ZVByb3BlcnR5OiAodGFyZ2V0OiBvYmplY3QsIHByb3BlcnR5OiBQcm9wZXJ0eUtleSkgPT4gYm9vbGVhbiA9XG4gIGJ1aWx0SW5SZWZsZWN0ID8/XG4gIGZ1bmN0aW9uIGRlbGV0ZVByb3BlcnR5RmsodGFyZ2V0OiBvYmplY3QsIHByb3BlcnR5OiBQcm9wZXJ0eUtleSk6IGJvb2xlYW4ge1xuICAgIC8vIFZlcmlmeSB3aGV0aGVyIHRhcmdldCBpcyBvYmplY3QuXG4gICAgaWYgKGlzT2JqZWN0KHRhcmdldCkpXG4gICAgICB0cnkge1xuICAgICAgICByZXR1cm4gaGFzT3duUHJvcGVydHkodGFyZ2V0LCBwcm9wZXJ0eSkgPyBkZWxldGUgdGFyZ2V0W3Byb3BlcnR5XSA6IGZhbHNlO1xuICAgICAgfSBjYXRjaCB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICBlbHNlIHRocm93IG5ldyBUeXBlRXJyb3IoJ1Byb3BlcnR5IGNhbiBiZSBkZWxldGVkIG9ubHkgZnJvbSB0aGUgb2JqZWN0Jyk7XG4gIH07XG5cbi8qKlxuICogUmVtb3ZlcyBhIGdpdmVuIHByb3BlcnR5IGZyb20gYW4gb2JqZWN0LlxuICpcbiAqIEBwYXJhbSB0YXJnZXQgT2JqZWN0IGZyb20gd2hpY2ggdG8gZGVsZXRlIHRoZSBwcm9wZXJ0eS5cbiAqIEBwYXJhbSBwcm9wZXJ0eSBOYW1lIG9mIHRoZSBwcm9wZXJ0eSB0byBiZSBkZWxldGVkLlxuICogQHJldHVybiBUcnVlIGluIGNhc2Ugb3BlcmF0aW9uIGlzIHN1Y2Nlc3NmdWw7IGZhbHNlIG90aGVyd2lzZS5cbiAqIEB0aHJvd3MgVHlwZUVycm9yIGluIGNhc2Ugb2Ygbm9uLW9iamVjdCB0YXJnZXQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkZWxldGVQcm9wZXJ0eSh0YXJnZXQ6IG9iamVjdCwgcHJvcGVydHk6IFByb3BlcnR5S2V5KTogYm9vbGVhbiB7XG4gIHJldHVybiBfZGVsZXRlUHJvcGVydHkodGFyZ2V0LCBwcm9wZXJ0eSk7XG59XG4iXX0=