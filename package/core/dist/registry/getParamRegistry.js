"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var createRegistry_1 = require("./createRegistry");
var getPropertyRegistry_1 = require("./getPropertyRegistry");
/**
 * Get registry linked with the class (prototype), method & parameter.
 *
 * @param target Class (prototype).
 * @param method Method name.
 * @param paramIdx Parameter index.
 * @return Registry in case is defined; undefined otherwise.
 */
function getParamRegistry(target, method, paramIdx) {
    var _a;
    // Retrieve from parameter registry in case it's exist.
    return (_a = getPropertyRegistry_1.getPropertyRegistry(target, method)) === null || _a === void 0 ? void 0 : _a.parameter[paramIdx];
}
exports.getParamRegistry = getParamRegistry;
/**
 * Get or create registry linked with the class (prototype), method & parameter.
 *
 * @param target Class (prototype).
 * @param method Method name.
 * @param paramIdx Parameter index.
 * @return Existing or newly created registry.
 */
function getOrCreateParamRegistry(target, method, paramIdx) {
    var _a;
    return (_a = getParamRegistry(target, method, paramIdx)) !== null && _a !== void 0 ? _a : createRegistry_1.createRegistry();
}
exports.getOrCreateParamRegistry = getOrCreateParamRegistry;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0UGFyYW1SZWdpc3RyeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9yZWdpc3RyeS9nZXRQYXJhbVJlZ2lzdHJ5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsbURBQWtEO0FBQ2xELDZEQUE0RDtBQUU1RDs7Ozs7OztHQU9HO0FBQ0gsU0FBZ0IsZ0JBQWdCLENBQUMsTUFBYyxFQUFFLE1BQW1CLEVBQUUsUUFBZ0I7O0lBQ3BGLHVEQUF1RDtJQUN2RCxhQUFPLHlDQUFtQixDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsMENBQUUsU0FBUyxDQUFDLFFBQVEsRUFBRTtBQUNsRSxDQUFDO0FBSEQsNENBR0M7QUFFRDs7Ozs7OztHQU9HO0FBQ0gsU0FBZ0Isd0JBQXdCLENBQUMsTUFBYyxFQUFFLE1BQW1CLEVBQUUsUUFBZ0I7O0lBQzVGLGFBQU8sZ0JBQWdCLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxRQUFRLENBQUMsbUNBQUksK0JBQWMsRUFBRSxDQUFDO0FBQ3hFLENBQUM7QUFGRCw0REFFQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBhcmFtUmVnaXN0cnkgfSBmcm9tICcuL3BhcmFtUmVnaXN0cnknO1xuaW1wb3J0IHsgY3JlYXRlUmVnaXN0cnkgfSBmcm9tICcuL2NyZWF0ZVJlZ2lzdHJ5JztcbmltcG9ydCB7IGdldFByb3BlcnR5UmVnaXN0cnkgfSBmcm9tICcuL2dldFByb3BlcnR5UmVnaXN0cnknO1xuXG4vKipcbiAqIEdldCByZWdpc3RyeSBsaW5rZWQgd2l0aCB0aGUgY2xhc3MgKHByb3RvdHlwZSksIG1ldGhvZCAmIHBhcmFtZXRlci5cbiAqXG4gKiBAcGFyYW0gdGFyZ2V0IENsYXNzIChwcm90b3R5cGUpLlxuICogQHBhcmFtIG1ldGhvZCBNZXRob2QgbmFtZS5cbiAqIEBwYXJhbSBwYXJhbUlkeCBQYXJhbWV0ZXIgaW5kZXguXG4gKiBAcmV0dXJuIFJlZ2lzdHJ5IGluIGNhc2UgaXMgZGVmaW5lZDsgdW5kZWZpbmVkIG90aGVyd2lzZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFBhcmFtUmVnaXN0cnkodGFyZ2V0OiBvYmplY3QsIG1ldGhvZDogUHJvcGVydHlLZXksIHBhcmFtSWR4OiBudW1iZXIpOiBQYXJhbVJlZ2lzdHJ5IHwgdW5kZWZpbmVkIHtcbiAgLy8gUmV0cmlldmUgZnJvbSBwYXJhbWV0ZXIgcmVnaXN0cnkgaW4gY2FzZSBpdCdzIGV4aXN0LlxuICByZXR1cm4gZ2V0UHJvcGVydHlSZWdpc3RyeSh0YXJnZXQsIG1ldGhvZCk/LnBhcmFtZXRlcltwYXJhbUlkeF07XG59XG5cbi8qKlxuICogR2V0IG9yIGNyZWF0ZSByZWdpc3RyeSBsaW5rZWQgd2l0aCB0aGUgY2xhc3MgKHByb3RvdHlwZSksIG1ldGhvZCAmIHBhcmFtZXRlci5cbiAqXG4gKiBAcGFyYW0gdGFyZ2V0IENsYXNzIChwcm90b3R5cGUpLlxuICogQHBhcmFtIG1ldGhvZCBNZXRob2QgbmFtZS5cbiAqIEBwYXJhbSBwYXJhbUlkeCBQYXJhbWV0ZXIgaW5kZXguXG4gKiBAcmV0dXJuIEV4aXN0aW5nIG9yIG5ld2x5IGNyZWF0ZWQgcmVnaXN0cnkuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRPckNyZWF0ZVBhcmFtUmVnaXN0cnkodGFyZ2V0OiBvYmplY3QsIG1ldGhvZDogUHJvcGVydHlLZXksIHBhcmFtSWR4OiBudW1iZXIpOiBQYXJhbVJlZ2lzdHJ5IHtcbiAgcmV0dXJuIGdldFBhcmFtUmVnaXN0cnkodGFyZ2V0LCBtZXRob2QsIHBhcmFtSWR4KSA/PyBjcmVhdGVSZWdpc3RyeSgpO1xufVxuIl19