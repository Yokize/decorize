"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var setPropertyRegistry_1 = require("./setPropertyRegistry");
var getPropertyRegistry_1 = require("./getPropertyRegistry");
/**
 * Link registry with the class (prototype), method & param.
 *
 * @param target Class (prototype).
 * @param method Method name.
 * @param paramIdx Parameter index.
 * @param registry Registry to link.
 */
function setParamRegistry(target, method, paramIdx, registry) {
    // Get or create registry associated with the method.
    var propertyRegistry = getPropertyRegistry_1.getOrCreatePropertyRegistry(target, method);
    // Assign registry into parameter section.
    propertyRegistry.parameter[paramIdx] = registry;
    // Link registry with the class (prototype), method & param.
    setPropertyRegistry_1.setPropertyRegistry(target, method, propertyRegistry);
}
exports.setParamRegistry = setParamRegistry;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0UGFyYW1SZWdpc3RyeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9yZWdpc3RyeS9zZXRQYXJhbVJlZ2lzdHJ5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsNkRBQTREO0FBQzVELDZEQUFvRTtBQUVwRTs7Ozs7OztHQU9HO0FBQ0gsU0FBZ0IsZ0JBQWdCLENBQUMsTUFBYyxFQUFFLE1BQW1CLEVBQUUsUUFBZ0IsRUFBRSxRQUF1QjtJQUM3RyxxREFBcUQ7SUFDckQsSUFBTSxnQkFBZ0IsR0FBcUIsaURBQTJCLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBRXZGLDBDQUEwQztJQUMxQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEdBQUcsUUFBUSxDQUFDO0lBRWhELDREQUE0RDtJQUM1RCx5Q0FBbUIsQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLGdCQUFnQixDQUFDLENBQUM7QUFDeEQsQ0FBQztBQVRELDRDQVNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGFyYW1SZWdpc3RyeSB9IGZyb20gJy4vcGFyYW1SZWdpc3RyeSc7XG5pbXBvcnQgeyBQcm9wZXJ0eVJlZ2lzdHJ5IH0gZnJvbSAnLi9wcm9wZXJ0eVJlZ2lzdHJ5JztcbmltcG9ydCB7IHNldFByb3BlcnR5UmVnaXN0cnkgfSBmcm9tICcuL3NldFByb3BlcnR5UmVnaXN0cnknO1xuaW1wb3J0IHsgZ2V0T3JDcmVhdGVQcm9wZXJ0eVJlZ2lzdHJ5IH0gZnJvbSAnLi9nZXRQcm9wZXJ0eVJlZ2lzdHJ5JztcblxuLyoqXG4gKiBMaW5rIHJlZ2lzdHJ5IHdpdGggdGhlIGNsYXNzIChwcm90b3R5cGUpLCBtZXRob2QgJiBwYXJhbS5cbiAqXG4gKiBAcGFyYW0gdGFyZ2V0IENsYXNzIChwcm90b3R5cGUpLlxuICogQHBhcmFtIG1ldGhvZCBNZXRob2QgbmFtZS5cbiAqIEBwYXJhbSBwYXJhbUlkeCBQYXJhbWV0ZXIgaW5kZXguXG4gKiBAcGFyYW0gcmVnaXN0cnkgUmVnaXN0cnkgdG8gbGluay5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNldFBhcmFtUmVnaXN0cnkodGFyZ2V0OiBvYmplY3QsIG1ldGhvZDogUHJvcGVydHlLZXksIHBhcmFtSWR4OiBudW1iZXIsIHJlZ2lzdHJ5OiBQYXJhbVJlZ2lzdHJ5KTogdm9pZCB7XG4gIC8vIEdldCBvciBjcmVhdGUgcmVnaXN0cnkgYXNzb2NpYXRlZCB3aXRoIHRoZSBtZXRob2QuXG4gIGNvbnN0IHByb3BlcnR5UmVnaXN0cnk6IFByb3BlcnR5UmVnaXN0cnkgPSBnZXRPckNyZWF0ZVByb3BlcnR5UmVnaXN0cnkodGFyZ2V0LCBtZXRob2QpO1xuXG4gIC8vIEFzc2lnbiByZWdpc3RyeSBpbnRvIHBhcmFtZXRlciBzZWN0aW9uLlxuICBwcm9wZXJ0eVJlZ2lzdHJ5LnBhcmFtZXRlcltwYXJhbUlkeF0gPSByZWdpc3RyeTtcblxuICAvLyBMaW5rIHJlZ2lzdHJ5IHdpdGggdGhlIGNsYXNzIChwcm90b3R5cGUpLCBtZXRob2QgJiBwYXJhbS5cbiAgc2V0UHJvcGVydHlSZWdpc3RyeSh0YXJnZXQsIG1ldGhvZCwgcHJvcGVydHlSZWdpc3RyeSk7XG59XG4iXX0=