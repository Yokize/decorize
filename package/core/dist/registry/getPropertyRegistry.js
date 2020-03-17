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
var createRegistry_1 = require("./createRegistry");
var getClassRegistry_1 = require("./getClassRegistry");
/**
 * Get registry linked with the class (prototype) & property.
 *
 * @param target Class (prototype).
 * @param property Property name.
 * @return Registry in case is defined; undefined otherwise.
 */
function getPropertyRegistry(target, property) {
    var _a;
    // Retrieve from property registry in case it's exist.
    return (_a = getClassRegistry_1.getClassRegistry(target)) === null || _a === void 0 ? void 0 : _a.property[property];
}
exports.getPropertyRegistry = getPropertyRegistry;
/**
 * Get or create registry linked with the class (prototype) & property.
 *
 * @param target Class (prototype).
 * @param property Property name.
 * @return Existing or newly created registry.
 */
function getOrCreatePropertyRegistry(target, property) {
    var _a;
    return (_a = getPropertyRegistry(target, property)) !== null && _a !== void 0 ? _a : __assign(__assign({}, createRegistry_1.createRegistry()), { parameter: {} });
}
exports.getOrCreatePropertyRegistry = getOrCreatePropertyRegistry;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0UHJvcGVydHlSZWdpc3RyeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9yZWdpc3RyeS9nZXRQcm9wZXJ0eVJlZ2lzdHJ5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQSxtREFBa0Q7QUFFbEQsdURBQXNEO0FBRXREOzs7Ozs7R0FNRztBQUNILFNBQWdCLG1CQUFtQixDQUFDLE1BQWMsRUFBRSxRQUFxQjs7SUFDdkUsc0RBQXNEO0lBQ3RELGFBQU8sbUNBQWdCLENBQUMsTUFBTSxDQUFDLDBDQUFFLFFBQVEsQ0FBTSxRQUFRLEVBQUU7QUFDM0QsQ0FBQztBQUhELGtEQUdDO0FBRUQ7Ozs7OztHQU1HO0FBQ0gsU0FBZ0IsMkJBQTJCLENBQUMsTUFBYyxFQUFFLFFBQXFCOztJQUMvRSxhQUFPLG1CQUFtQixDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMseURBQVMsK0JBQWMsRUFBRSxLQUFFLFNBQVMsRUFBRSxFQUFFLElBQUc7QUFDekYsQ0FBQztBQUZELGtFQUVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3JlYXRlUmVnaXN0cnkgfSBmcm9tICcuL2NyZWF0ZVJlZ2lzdHJ5JztcbmltcG9ydCB7IFByb3BlcnR5UmVnaXN0cnkgfSBmcm9tICcuL3Byb3BlcnR5UmVnaXN0cnknO1xuaW1wb3J0IHsgZ2V0Q2xhc3NSZWdpc3RyeSB9IGZyb20gJy4vZ2V0Q2xhc3NSZWdpc3RyeSc7XG5cbi8qKlxuICogR2V0IHJlZ2lzdHJ5IGxpbmtlZCB3aXRoIHRoZSBjbGFzcyAocHJvdG90eXBlKSAmIHByb3BlcnR5LlxuICpcbiAqIEBwYXJhbSB0YXJnZXQgQ2xhc3MgKHByb3RvdHlwZSkuXG4gKiBAcGFyYW0gcHJvcGVydHkgUHJvcGVydHkgbmFtZS5cbiAqIEByZXR1cm4gUmVnaXN0cnkgaW4gY2FzZSBpcyBkZWZpbmVkOyB1bmRlZmluZWQgb3RoZXJ3aXNlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0UHJvcGVydHlSZWdpc3RyeSh0YXJnZXQ6IG9iamVjdCwgcHJvcGVydHk6IFByb3BlcnR5S2V5KTogUHJvcGVydHlSZWdpc3RyeSB8IHVuZGVmaW5lZCB7XG4gIC8vIFJldHJpZXZlIGZyb20gcHJvcGVydHkgcmVnaXN0cnkgaW4gY2FzZSBpdCdzIGV4aXN0LlxuICByZXR1cm4gZ2V0Q2xhc3NSZWdpc3RyeSh0YXJnZXQpPy5wcm9wZXJ0eVs8YW55PnByb3BlcnR5XTtcbn1cblxuLyoqXG4gKiBHZXQgb3IgY3JlYXRlIHJlZ2lzdHJ5IGxpbmtlZCB3aXRoIHRoZSBjbGFzcyAocHJvdG90eXBlKSAmIHByb3BlcnR5LlxuICpcbiAqIEBwYXJhbSB0YXJnZXQgQ2xhc3MgKHByb3RvdHlwZSkuXG4gKiBAcGFyYW0gcHJvcGVydHkgUHJvcGVydHkgbmFtZS5cbiAqIEByZXR1cm4gRXhpc3Rpbmcgb3IgbmV3bHkgY3JlYXRlZCByZWdpc3RyeS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldE9yQ3JlYXRlUHJvcGVydHlSZWdpc3RyeSh0YXJnZXQ6IG9iamVjdCwgcHJvcGVydHk6IFByb3BlcnR5S2V5KTogUHJvcGVydHlSZWdpc3RyeSB7XG4gIHJldHVybiBnZXRQcm9wZXJ0eVJlZ2lzdHJ5KHRhcmdldCwgcHJvcGVydHkpID8/IHsgLi4uY3JlYXRlUmVnaXN0cnkoKSwgcGFyYW1ldGVyOiB7fSB9O1xufVxuIl19