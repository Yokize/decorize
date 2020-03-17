"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var isObject_1 = __importDefault(require("lodash/isObject"));
/* istanbul ignore next */
var builtInReflect = Reflect === null || Reflect === void 0 ? void 0 : Reflect.ownKeys;
/**
 * Reflect already include extracting of own symbol keys from the object. Fallback
 * behave the same as Reflect and in case the Symbol is not supported get only own
 * string keys. Exceptional case is aligned and violation of target type throws
 * a TypeError.
 */
var _getOwnKeys = (builtInReflect !== null && builtInReflect !== void 0 ? builtInReflect : Object.getOwnPropertySymbols) ? function getOwnKeysWithSymbolsFk(target) {
    if (isObject_1.default(target))
        // Use built-in helpers to get own properties and symbols.
        return __spreadArrays(Object.getOwnPropertyNames(target), Object.getOwnPropertySymbols(target));
    else
        throw new TypeError('Own keys with symbols can be retrieved only from the object');
}
    : function getOwnKeysWithoutSymbolsFk(target) {
        if (isObject_1.default(target))
            // Use built-in helper to get own properties.
            return Object.getOwnPropertyNames(target);
        else
            throw new TypeError('Own keys without symbols can be retrieved only from the object');
    };
/**
 * Get the names and symbols of the object's own properties.
 *
 * @param target Object from which to get own keys.
 * @return Names or symbols of the own properties of an object.
 * @throws TypeError in case of non-object target.
 */
function getOwnKeys(target) {
    return _getOwnKeys(target);
}
exports.getOwnKeys = getOwnKeys;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0T3duS2V5cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9yZWZsZWN0L2dldE93bktleXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsNkRBQXVDO0FBRXZDLDBCQUEwQjtBQUMxQixJQUFNLGNBQWMsR0FBUSxPQUFPLGFBQVAsT0FBTyx1QkFBUCxPQUFPLENBQUUsT0FBTyxDQUFDO0FBRTdDOzs7OztHQUtHO0FBQ0gsSUFBTSxXQUFXLEdBQ2YsQ0FBQSxjQUFjLGFBQWQsY0FBYyxjQUFkLGNBQWMsR0FBSSxNQUFNLENBQUMscUJBQXFCLEVBQzVDLENBQUMsQ0FBQyxTQUFTLHVCQUF1QixDQUFDLE1BQWM7SUFDN0MsSUFBSSxrQkFBUSxDQUFDLE1BQU0sQ0FBQztRQUNsQiwwREFBMEQ7UUFDMUQsc0JBQVcsTUFBTSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxFQUFLLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxNQUFNLENBQUMsRUFBRTs7UUFDckYsTUFBTSxJQUFJLFNBQVMsQ0FBQyw2REFBNkQsQ0FBQyxDQUFDO0FBQzFGLENBQUM7SUFDSCxDQUFDLENBQUMsU0FBUywwQkFBMEIsQ0FBQyxNQUFjO1FBQ2hELElBQUksa0JBQVEsQ0FBQyxNQUFNLENBQUM7WUFDbEIsNkNBQTZDO1lBQzdDLE9BQU8sTUFBTSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxDQUFDOztZQUN2QyxNQUFNLElBQUksU0FBUyxDQUFDLGdFQUFnRSxDQUFDLENBQUM7SUFDN0YsQ0FBQyxDQUFDO0FBRVI7Ozs7OztHQU1HO0FBQ0gsU0FBZ0IsVUFBVSxDQUFDLE1BQWM7SUFDdkMsT0FBTyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDN0IsQ0FBQztBQUZELGdDQUVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGlzT2JqZWN0IGZyb20gJ2xvZGFzaC9pc09iamVjdCc7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG5jb25zdCBidWlsdEluUmVmbGVjdDogYW55ID0gUmVmbGVjdD8ub3duS2V5cztcblxuLyoqXG4gKiBSZWZsZWN0IGFscmVhZHkgaW5jbHVkZSBleHRyYWN0aW5nIG9mIG93biBzeW1ib2wga2V5cyBmcm9tIHRoZSBvYmplY3QuIEZhbGxiYWNrXG4gKiBiZWhhdmUgdGhlIHNhbWUgYXMgUmVmbGVjdCBhbmQgaW4gY2FzZSB0aGUgU3ltYm9sIGlzIG5vdCBzdXBwb3J0ZWQgZ2V0IG9ubHkgb3duXG4gKiBzdHJpbmcga2V5cy4gRXhjZXB0aW9uYWwgY2FzZSBpcyBhbGlnbmVkIGFuZCB2aW9sYXRpb24gb2YgdGFyZ2V0IHR5cGUgdGhyb3dzXG4gKiBhIFR5cGVFcnJvci5cbiAqL1xuY29uc3QgX2dldE93bktleXM6ICh0YXJnZXQ6IG9iamVjdCkgPT4gUHJvcGVydHlLZXlbXSA9XG4gIGJ1aWx0SW5SZWZsZWN0ID8/IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHNcbiAgICA/IGZ1bmN0aW9uIGdldE93bktleXNXaXRoU3ltYm9sc0ZrKHRhcmdldDogb2JqZWN0KTogUHJvcGVydHlLZXlbXSB7XG4gICAgICAgIGlmIChpc09iamVjdCh0YXJnZXQpKVxuICAgICAgICAgIC8vIFVzZSBidWlsdC1pbiBoZWxwZXJzIHRvIGdldCBvd24gcHJvcGVydGllcyBhbmQgc3ltYm9scy5cbiAgICAgICAgICByZXR1cm4gWy4uLk9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRhcmdldCksIC4uLk9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHModGFyZ2V0KV07XG4gICAgICAgIGVsc2UgdGhyb3cgbmV3IFR5cGVFcnJvcignT3duIGtleXMgd2l0aCBzeW1ib2xzIGNhbiBiZSByZXRyaWV2ZWQgb25seSBmcm9tIHRoZSBvYmplY3QnKTtcbiAgICAgIH1cbiAgICA6IGZ1bmN0aW9uIGdldE93bktleXNXaXRob3V0U3ltYm9sc0ZrKHRhcmdldDogb2JqZWN0KTogUHJvcGVydHlLZXlbXSB7XG4gICAgICAgIGlmIChpc09iamVjdCh0YXJnZXQpKVxuICAgICAgICAgIC8vIFVzZSBidWlsdC1pbiBoZWxwZXIgdG8gZ2V0IG93biBwcm9wZXJ0aWVzLlxuICAgICAgICAgIHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0YXJnZXQpO1xuICAgICAgICBlbHNlIHRocm93IG5ldyBUeXBlRXJyb3IoJ093biBrZXlzIHdpdGhvdXQgc3ltYm9scyBjYW4gYmUgcmV0cmlldmVkIG9ubHkgZnJvbSB0aGUgb2JqZWN0Jyk7XG4gICAgICB9O1xuXG4vKipcbiAqIEdldCB0aGUgbmFtZXMgYW5kIHN5bWJvbHMgb2YgdGhlIG9iamVjdCdzIG93biBwcm9wZXJ0aWVzLlxuICpcbiAqIEBwYXJhbSB0YXJnZXQgT2JqZWN0IGZyb20gd2hpY2ggdG8gZ2V0IG93biBrZXlzLlxuICogQHJldHVybiBOYW1lcyBvciBzeW1ib2xzIG9mIHRoZSBvd24gcHJvcGVydGllcyBvZiBhbiBvYmplY3QuXG4gKiBAdGhyb3dzIFR5cGVFcnJvciBpbiBjYXNlIG9mIG5vbi1vYmplY3QgdGFyZ2V0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0T3duS2V5cyh0YXJnZXQ6IG9iamVjdCk6IFByb3BlcnR5S2V5W10ge1xuICByZXR1cm4gX2dldE93bktleXModGFyZ2V0KTtcbn1cbiJdfQ==