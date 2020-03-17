"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var getOwnMetadata_1 = require("../reflect/getOwnMetadata");
var baseRegistry_1 = require("./baseRegistry");
var createRegistry_1 = require("./createRegistry");
/**
 * Get registry linked with the class (prototype).
 *
 * @param target Class (prototype).
 * @return Registry in case is defined; undefined otherwise.
 */
function getClassRegistry(target) {
    return getOwnMetadata_1.getOwnMetadata(baseRegistry_1._registryKey, target);
}
exports.getClassRegistry = getClassRegistry;
/**
 * Get or create registry linked with the class (prototype).
 *
 * @param target Class (prototype).
 * @return Existing or newly created registry.
 */
function getOrCreateClassRegistry(target) {
    var _a;
    return (_a = getClassRegistry(target)) !== null && _a !== void 0 ? _a : __assign(__assign({}, createRegistry_1.createRegistry()), { property: {} });
}
exports.getOrCreateClassRegistry = getOrCreateClassRegistry;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0Q2xhc3NSZWdpc3RyeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9yZWdpc3RyeS9nZXRDbGFzc1JlZ2lzdHJ5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQSw0REFBMkQ7QUFDM0QsK0NBQThDO0FBRTlDLG1EQUFrRDtBQUVsRDs7Ozs7R0FLRztBQUNILFNBQWdCLGdCQUFnQixDQUFDLE1BQWM7SUFDN0MsT0FBTywrQkFBYyxDQUFDLDJCQUFZLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDOUMsQ0FBQztBQUZELDRDQUVDO0FBRUQ7Ozs7O0dBS0c7QUFDSCxTQUFnQix3QkFBd0IsQ0FBQyxNQUFjOztJQUNyRCxhQUFPLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyx5REFBUywrQkFBYyxFQUFFLEtBQUUsUUFBUSxFQUFFLEVBQUUsSUFBRztBQUMzRSxDQUFDO0FBRkQsNERBRUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBnZXRPd25NZXRhZGF0YSB9IGZyb20gJy4uL3JlZmxlY3QvZ2V0T3duTWV0YWRhdGEnO1xuaW1wb3J0IHsgX3JlZ2lzdHJ5S2V5IH0gZnJvbSAnLi9iYXNlUmVnaXN0cnknO1xuaW1wb3J0IHsgQ2xhc3NSZWdpc3RyeSB9IGZyb20gJy4vY2xhc3NSZWdpc3RyeSc7XG5pbXBvcnQgeyBjcmVhdGVSZWdpc3RyeSB9IGZyb20gJy4vY3JlYXRlUmVnaXN0cnknO1xuXG4vKipcbiAqIEdldCByZWdpc3RyeSBsaW5rZWQgd2l0aCB0aGUgY2xhc3MgKHByb3RvdHlwZSkuXG4gKlxuICogQHBhcmFtIHRhcmdldCBDbGFzcyAocHJvdG90eXBlKS5cbiAqIEByZXR1cm4gUmVnaXN0cnkgaW4gY2FzZSBpcyBkZWZpbmVkOyB1bmRlZmluZWQgb3RoZXJ3aXNlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q2xhc3NSZWdpc3RyeSh0YXJnZXQ6IG9iamVjdCk6IENsYXNzUmVnaXN0cnkgfCB1bmRlZmluZWQge1xuICByZXR1cm4gZ2V0T3duTWV0YWRhdGEoX3JlZ2lzdHJ5S2V5LCB0YXJnZXQpO1xufVxuXG4vKipcbiAqIEdldCBvciBjcmVhdGUgcmVnaXN0cnkgbGlua2VkIHdpdGggdGhlIGNsYXNzIChwcm90b3R5cGUpLlxuICpcbiAqIEBwYXJhbSB0YXJnZXQgQ2xhc3MgKHByb3RvdHlwZSkuXG4gKiBAcmV0dXJuIEV4aXN0aW5nIG9yIG5ld2x5IGNyZWF0ZWQgcmVnaXN0cnkuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRPckNyZWF0ZUNsYXNzUmVnaXN0cnkodGFyZ2V0OiBvYmplY3QpOiBDbGFzc1JlZ2lzdHJ5IHtcbiAgcmV0dXJuIGdldENsYXNzUmVnaXN0cnkodGFyZ2V0KSA/PyB7IC4uLmNyZWF0ZVJlZ2lzdHJ5KCksIHByb3BlcnR5OiB7fSB9O1xufVxuIl19