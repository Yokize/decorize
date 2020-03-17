"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var isObject_1 = __importDefault(require("lodash/isObject"));
/* istanbul ignore next */
var builtInReflect = Reflect === null || Reflect === void 0 ? void 0 : Reflect.getPrototypeOf;
/**
 * Reflect and Object built-in function returns the prototype of the object
 * (value of the internal [[Prototype]]). Exceptional case is aligned and
 * violation of target type throws a TypeError.
 */
var _getPrototypeOf = builtInReflect !== null && builtInReflect !== void 0 ? builtInReflect : function getPrototypeOfFk(target) {
    // Verify whether target is object.
    if (isObject_1.default(target))
        // Use built-in helper to get prototype.
        return Object.getPrototypeOf(target);
    else
        throw new TypeError('Prototype can be retrieved only from the object');
};
/**
 * Get the prototype of the object.
 *
 * @param target Object referring to the prototype.
 * @return Prototype; null in case of missing prototype.
 * @throws TypeError in case of non-object target.
 */
function getPrototypeOf(target) {
    return _getPrototypeOf(target);
}
exports.getPrototypeOf = getPrototypeOf;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0UHJvdG90eXBlT2YuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvcmVmbGVjdC9nZXRQcm90b3R5cGVPZi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDZEQUF1QztBQUV2QywwQkFBMEI7QUFDMUIsSUFBTSxjQUFjLEdBQVEsT0FBTyxhQUFQLE9BQU8sdUJBQVAsT0FBTyxDQUFFLGNBQWMsQ0FBQztBQUVwRDs7OztHQUlHO0FBQ0gsSUFBTSxlQUFlLEdBQ25CLGNBQWMsYUFBZCxjQUFjLGNBQWQsY0FBYyxHQUNkLFNBQVMsZ0JBQWdCLENBQUMsTUFBYztJQUN0QyxtQ0FBbUM7SUFDbkMsSUFBSSxrQkFBUSxDQUFDLE1BQU0sQ0FBQztRQUNsQix3Q0FBd0M7UUFDeEMsT0FBTyxNQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDOztRQUNsQyxNQUFNLElBQUksU0FBUyxDQUFDLGlEQUFpRCxDQUFDLENBQUM7QUFDOUUsQ0FBQyxDQUFDO0FBRUo7Ozs7OztHQU1HO0FBQ0gsU0FBZ0IsY0FBYyxDQUFDLE1BQWM7SUFDM0MsT0FBTyxlQUFlLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDakMsQ0FBQztBQUZELHdDQUVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGlzT2JqZWN0IGZyb20gJ2xvZGFzaC9pc09iamVjdCc7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG5jb25zdCBidWlsdEluUmVmbGVjdDogYW55ID0gUmVmbGVjdD8uZ2V0UHJvdG90eXBlT2Y7XG5cbi8qKlxuICogUmVmbGVjdCBhbmQgT2JqZWN0IGJ1aWx0LWluIGZ1bmN0aW9uIHJldHVybnMgdGhlIHByb3RvdHlwZSBvZiB0aGUgb2JqZWN0XG4gKiAodmFsdWUgb2YgdGhlIGludGVybmFsIFtbUHJvdG90eXBlXV0pLiBFeGNlcHRpb25hbCBjYXNlIGlzIGFsaWduZWQgYW5kXG4gKiB2aW9sYXRpb24gb2YgdGFyZ2V0IHR5cGUgdGhyb3dzIGEgVHlwZUVycm9yLlxuICovXG5jb25zdCBfZ2V0UHJvdG90eXBlT2Y6ICh0YXJnZXQ6IG9iamVjdCkgPT4gYW55IHwgdW5kZWZpbmVkID1cbiAgYnVpbHRJblJlZmxlY3QgPz9cbiAgZnVuY3Rpb24gZ2V0UHJvdG90eXBlT2ZGayh0YXJnZXQ6IG9iamVjdCk6IGFueSB8IHVuZGVmaW5lZCB7XG4gICAgLy8gVmVyaWZ5IHdoZXRoZXIgdGFyZ2V0IGlzIG9iamVjdC5cbiAgICBpZiAoaXNPYmplY3QodGFyZ2V0KSlcbiAgICAgIC8vIFVzZSBidWlsdC1pbiBoZWxwZXIgdG8gZ2V0IHByb3RvdHlwZS5cbiAgICAgIHJldHVybiBPYmplY3QuZ2V0UHJvdG90eXBlT2YodGFyZ2V0KTtcbiAgICBlbHNlIHRocm93IG5ldyBUeXBlRXJyb3IoJ1Byb3RvdHlwZSBjYW4gYmUgcmV0cmlldmVkIG9ubHkgZnJvbSB0aGUgb2JqZWN0Jyk7XG4gIH07XG5cbi8qKlxuICogR2V0IHRoZSBwcm90b3R5cGUgb2YgdGhlIG9iamVjdC5cbiAqXG4gKiBAcGFyYW0gdGFyZ2V0IE9iamVjdCByZWZlcnJpbmcgdG8gdGhlIHByb3RvdHlwZS5cbiAqIEByZXR1cm4gUHJvdG90eXBlOyBudWxsIGluIGNhc2Ugb2YgbWlzc2luZyBwcm90b3R5cGUuXG4gKiBAdGhyb3dzIFR5cGVFcnJvciBpbiBjYXNlIG9mIG5vbi1vYmplY3QgdGFyZ2V0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0UHJvdG90eXBlT2YodGFyZ2V0OiBvYmplY3QpOiBhbnkgfCB1bmRlZmluZWQge1xuICByZXR1cm4gX2dldFByb3RvdHlwZU9mKHRhcmdldCk7XG59XG4iXX0=