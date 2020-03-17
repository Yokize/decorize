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
var pick_1 = __importDefault(require("lodash/pick"));
var isNil_1 = __importDefault(require("lodash/isNil"));
var isFunction_1 = __importDefault(require("lodash/isFunction"));
var isPlainObject_1 = __importDefault(require("lodash/isPlainObject"));
var createSetter_1 = require("@decorize/core/accessor/createSetter");
var hasOwnProperty_1 = require("@decorize/core/reflect/hasOwnProperty");
var isOriginallyMethod_1 = require("@decorize/core/original/isOriginallyMethod");
var methodLegacyDecorator_1 = require("@decorize/core/legacy/methodLegacyDecorator");
var accessorLegacyDecorator_1 = require("@decorize/core/legacy/accessorLegacyDecorator");
var clear_1 = require("../clear");
var global_1 = require("../global");
/**
 * Decorate the method to clear the cache on execution.
 *
 * @param target Class (prototype).
 * @param property Method name.
 * @param descriptor Method descriptor.
 * @param configuration Configuration.
 * @return Descriptor with clear logic.
 */
function decorateMethod(target, property, descriptor, configuration) {
    // Attributes used to create new behaviour.
    var get = descriptor.get, set = descriptor.set, value = descriptor.value;
    // New descriptor with predefined clear logic.
    var newDescriptor = pick_1.default(descriptor, ['configurable', 'enumerable']);
    // Create new setter or use from an existing descriptor.
    newDescriptor.set = isFunction_1.default(get) || isFunction_1.default(set) ? set : createSetter_1.createSetter(property);
    // Create new getter which generate function with clear logic.
    newDescriptor.get = function clearCacheGetter() {
        var _a;
        // Function that will clear the cache.
        var fn = (_a = get === null || get === void 0 ? void 0 : get.call(this)) !== null && _a !== void 0 ? _a : value;
        // Verify that the function is the correct type.
        if (!isFunction_1.default(fn))
            clear_1.throwIncorrectUsage();
        // Return the original function in case its accessed from the prototype.
        if (hasOwnProperty_1.hasOwnProperty(this, 'constructor'))
            return fn;
        // Create new method with clear logic.
        return function clearCacheLogic() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // Execute without clear in case the context is nil.
            if (isNil_1.default(this))
                return fn.apply(this, args);
            // Clear the cache before executing the function.
            if (configuration === null || configuration === void 0 ? void 0 : configuration.before)
                global_1.Global.clear(this);
            // Result of the function.
            var result = fn.apply(this, args);
            // Clear the cache after executing the function.
            if ((configuration === null || configuration === void 0 ? void 0 : configuration.after) || !(configuration === null || configuration === void 0 ? void 0 : configuration.before))
                global_1.Global.clear(this);
            // Return function result.
            return result;
        };
    };
    // Return new descriptor with clear logic.
    return newDescriptor;
}
/**
 * Decorate the getter to clear the cache on execution.
 *
 * @param target Class (prototype).
 * @param property Property name.
 * @param descriptor Property descriptor.
 * @param configuration Configuration.
 * @return Descriptor with clear logic.
 */
function decorateGetter(target, property, descriptor, configuration) {
    // Attributes used to create new behaviour.
    var get = descriptor.get, set = descriptor.set;
    // New descriptor with predefined clear logic.
    var newDescriptor = pick_1.default(descriptor, ['configurable', 'enumerable']);
    // Use setter from an existing descriptor.
    newDescriptor.set = set;
    // Create new getter with clear logic.
    newDescriptor.get = function getterClearCacheLogic() {
        // Execute without clear in case its accessed from the prototype.
        if (hasOwnProperty_1.hasOwnProperty(this, 'constructor'))
            return get.call(this);
        // Clear the cache before executing the getter.
        if (configuration === null || configuration === void 0 ? void 0 : configuration.before)
            global_1.Global.clear(this);
        // Result of the getter.
        var result = get.call(this);
        // Clear the cache after executing the getter.
        if ((configuration === null || configuration === void 0 ? void 0 : configuration.after) || !(configuration === null || configuration === void 0 ? void 0 : configuration.before))
            global_1.Global.clear(this);
        // Return getter result.
        return result;
    };
    // Return new descriptor with clear logic.
    return newDescriptor;
}
/**
 * Decorate the setter to clear the cache on execution.
 *
 * @param target Class (prototype).
 * @param property Property name.
 * @param descriptor Property descriptor.
 * @param configuration Configuration.
 * @return Descriptor with clear logic.
 */
function decorateSetter(target, property, descriptor, configuration) {
    // Attributes used to create new behaviour.
    var get = descriptor.get, set = descriptor.set;
    // New descriptor with predefined clear logic.
    var newDescriptor = pick_1.default(descriptor, ['configurable', 'enumerable']);
    // Use getter from an existing descriptor.
    newDescriptor.get = get;
    // Create new setter with clear logic.
    newDescriptor.set = function setterClearCacheLogic() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        // Execute without clear in case its accessed from the prototype.
        if (hasOwnProperty_1.hasOwnProperty(this, 'constructor'))
            return set.call.apply(set, __spreadArrays([this], args));
        // Clear the cache before executing the setter.
        if (configuration === null || configuration === void 0 ? void 0 : configuration.before)
            global_1.Global.clear(this);
        // Execute the setter.
        set.call.apply(set, __spreadArrays([this], args));
        // Clear the cache after executing the setter.
        if ((configuration === null || configuration === void 0 ? void 0 : configuration.after) || !(configuration === null || configuration === void 0 ? void 0 : configuration.before))
            global_1.Global.clear(this);
    };
    // Return new descriptor with clear logic.
    return newDescriptor;
}
/**
 * Universal decorator (without type checking).
 */
function decorateUniversal(args) {
    if (args.length <= 1)
        // Decorator is used as the factory or applied with config.
        return function () {
            var args2 = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args2[_i] = arguments[_i];
            }
            return decorateUniversal(__spreadArrays(args2, args));
        };
    // Destructuring of dynamic arguments.
    var target = args[0], property = args[1], descriptor = args[2], configuration = args[3];
    // Verify that the decorator is used correctly.
    if (!isPlainObject_1.default(descriptor))
        clear_1.throwIncorrectUsage();
    // Create new decorator based on the property and configuration.
    var newlyCreatedDecorator = isFunction_1.default(descriptor.value) || isOriginallyMethod_1.isOriginallyMethod(target, property)
        ? methodLegacyDecorator_1.methodLegacyDecorator(clear_1.getDecoratorId(), decorateMethod, configuration)
        : isFunction_1.default(descriptor.get) || isFunction_1.default(descriptor.set)
            ? (configuration === null || configuration === void 0 ? void 0 : configuration.setter) || (descriptor.set && !descriptor.get)
                ? accessorLegacyDecorator_1.accessorLegacyDecorator(clear_1.getDecoratorId(), decorateSetter, configuration)
                : accessorLegacyDecorator_1.accessorLegacyDecorator(clear_1.getDecoratorId(), decorateGetter, configuration)
            : clear_1.throwIncorrectUsage();
    // Execute newly created decorator.
    return newlyCreatedDecorator(target, property, descriptor);
}
function CacheClear() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return decorateUniversal.call(null, args);
}
exports.CacheClear = CacheClear;
function cacheClear() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return decorateUniversal.call(null, args);
}
exports.cacheClear = cacheClear;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FjaGVDbGVhci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9sZWdhY3kvY2FjaGVDbGVhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxxREFBK0I7QUFDL0IsdURBQWlDO0FBQ2pDLGlFQUEyQztBQUMzQyx1RUFBaUQ7QUFDakQscUVBQW9FO0FBQ3BFLHdFQUF1RTtBQUN2RSxpRkFBZ0Y7QUFDaEYscUZBQW9GO0FBQ3BGLHlGQUF3RjtBQUN4RixrQ0FBNEU7QUFDNUUsb0NBQW1DO0FBRW5DOzs7Ozs7OztHQVFHO0FBQ0gsU0FBUyxjQUFjLENBQ3JCLE1BQWMsRUFDZCxRQUFxQixFQUNyQixVQUE4QixFQUM5QixhQUEyQjtJQUUzQiwyQ0FBMkM7SUFDbkMsSUFBQSxvQkFBRyxFQUFFLG9CQUFHLEVBQUUsd0JBQUssQ0FBb0M7SUFFM0QsOENBQThDO0lBQzlDLElBQU0sYUFBYSxHQUF1QixjQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsY0FBYyxFQUFFLFlBQVksQ0FBQyxDQUFDLENBQUM7SUFFM0Ysd0RBQXdEO0lBQ3hELGFBQWEsQ0FBQyxHQUFHLEdBQUcsb0JBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxvQkFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLDJCQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7SUFFdEYsOERBQThEO0lBQzlELGFBQWEsQ0FBQyxHQUFHLEdBQUcsU0FBUyxnQkFBZ0I7O1FBQzNDLHNDQUFzQztRQUN0QyxJQUFNLEVBQUUsU0FBYSxHQUFHLGFBQUgsR0FBRyx1QkFBSCxHQUFHLENBQUUsSUFBSSxDQUFDLElBQUksb0NBQUssS0FBSyxDQUFDO1FBRTlDLGdEQUFnRDtRQUNoRCxJQUFJLENBQUMsb0JBQVUsQ0FBQyxFQUFFLENBQUM7WUFBRSwyQkFBbUIsRUFBRSxDQUFDO1FBRTNDLHdFQUF3RTtRQUN4RSxJQUFJLCtCQUFjLENB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SSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQzVDLENBQUM7QUFGRCxnQ0FFQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBwaWNrIGZyb20gJ2xvZGFzaC9waWNrJztcbmltcG9ydCBpc05pbCBmcm9tICdsb2Rhc2gvaXNOaWwnO1xuaW1wb3J0IGlzRnVuY3Rpb24gZnJvbSAnbG9kYXNoL2lzRnVuY3Rpb24nO1xuaW1wb3J0IGlzUGxhaW5PYmplY3QgZnJvbSAnbG9kYXNoL2lzUGxhaW5PYmplY3QnO1xuaW1wb3J0IHsgY3JlYXRlU2V0dGVyIH0gZnJvbSAnQGRlY29yaXplL2NvcmUvYWNjZXNzb3IvY3JlYXRlU2V0dGVyJztcbmltcG9ydCB7IGhhc093blByb3BlcnR5IH0gZnJvbSAnQGRlY29yaXplL2NvcmUvcmVmbGVjdC9oYXNPd25Qcm9wZXJ0eSc7XG5pbXBvcnQgeyBpc09yaWdpbmFsbHlNZXRob2QgfSBmcm9tICdAZGVjb3JpemUvY29yZS9vcmlnaW5hbC9pc09yaWdpbmFsbHlNZXRob2QnO1xuaW1wb3J0IHsgbWV0aG9kTGVnYWN5RGVjb3JhdG9yIH0gZnJvbSAnQGRlY29yaXplL2NvcmUvbGVnYWN5L21ldGhvZExlZ2FjeURlY29yYXRvcic7XG5pbXBvcnQgeyBhY2Nlc3NvckxlZ2FjeURlY29yYXRvciB9IGZyb20gJ0BkZWNvcml6ZS9jb3JlL2xlZ2FjeS9hY2Nlc3NvckxlZ2FjeURlY29yYXRvcic7XG5pbXBvcnQgeyBnZXREZWNvcmF0b3JJZCwgQ2xlYXJDb25maWcsIHRocm93SW5jb3JyZWN0VXNhZ2UgfSBmcm9tICcuLi9jbGVhcic7XG5pbXBvcnQgeyBHbG9iYWwgfSBmcm9tICcuLi9nbG9iYWwnO1xuXG4vKipcbiAqIERlY29yYXRlIHRoZSBtZXRob2QgdG8gY2xlYXIgdGhlIGNhY2hlIG9uIGV4ZWN1dGlvbi5cbiAqXG4gKiBAcGFyYW0gdGFyZ2V0IENsYXNzIChwcm90b3R5cGUpLlxuICogQHBhcmFtIHByb3BlcnR5IE1ldGhvZCBuYW1lLlxuICogQHBhcmFtIGRlc2NyaXB0b3IgTWV0aG9kIGRlc2NyaXB0b3IuXG4gKiBAcGFyYW0gY29uZmlndXJhdGlvbiBDb25maWd1cmF0aW9uLlxuICogQHJldHVybiBEZXNjcmlwdG9yIHdpdGggY2xlYXIgbG9naWMuXG4gKi9cbmZ1bmN0aW9uIGRlY29yYXRlTWV0aG9kKFxuICB0YXJnZXQ6IG9iamVjdCxcbiAgcHJvcGVydHk6IFByb3BlcnR5S2V5LFxuICBkZXNjcmlwdG9yOiBQcm9wZXJ0eURlc2NyaXB0b3IsXG4gIGNvbmZpZ3VyYXRpb24/OiBDbGVhckNvbmZpZ1xuKTogUHJvcGVydHlEZXNjcmlwdG9yIHtcbiAgLy8gQXR0cmlidXRlcyB1c2VkIHRvIGNyZWF0ZSBuZXcgYmVoYXZpb3VyLlxuICBjb25zdCB7IGdldCwgc2V0LCB2YWx1ZSB9OiBQcm9wZXJ0eURlc2NyaXB0b3IgPSBkZXNjcmlwdG9yO1xuXG4gIC8vIE5ldyBkZXNjcmlwdG9yIHdpdGggcHJlZGVmaW5lZCBjbGVhciBsb2dpYy5cbiAgY29uc3QgbmV3RGVzY3JpcHRvcjogUHJvcGVydHlEZXNjcmlwdG9yID0gcGljayhkZXNjcmlwdG9yLCBbJ2NvbmZpZ3VyYWJsZScsICdlbnVtZXJhYmxlJ10pO1xuXG4gIC8vIENyZWF0ZSBuZXcgc2V0dGVyIG9yIHVzZSBmcm9tIGFuIGV4aXN0aW5nIGRlc2NyaXB0b3IuXG4gIG5ld0Rlc2NyaXB0b3Iuc2V0ID0gaXNGdW5jdGlvbihnZXQpIHx8IGlzRnVuY3Rpb24oc2V0KSA/IHNldCA6IGNyZWF0ZVNldHRlcihwcm9wZXJ0eSk7XG5cbiAgLy8gQ3JlYXRlIG5ldyBnZXR0ZXIgd2hpY2ggZ2VuZXJhdGUgZnVuY3Rpb24gd2l0aCBjbGVhciBsb2dpYy5cbiAgbmV3RGVzY3JpcHRvci5nZXQgPSBmdW5jdGlvbiBjbGVhckNhY2hlR2V0dGVyKHRoaXM6IG9iamVjdCk6IEZ1bmN0aW9uIHtcbiAgICAvLyBGdW5jdGlvbiB0aGF0IHdpbGwgY2xlYXIgdGhlIGNhY2hlLlxuICAgIGNvbnN0IGZuOiBGdW5jdGlvbiA9IGdldD8uY2FsbCh0aGlzKSA/PyB2YWx1ZTtcblxuICAgIC8vIFZlcmlmeSB0aGF0IHRoZSBmdW5jdGlvbiBpcyB0aGUgY29ycmVjdCB0eXBlLlxuICAgIGlmICghaXNGdW5jdGlvbihmbikpIHRocm93SW5jb3JyZWN0VXNhZ2UoKTtcblxuICAgIC8vIFJldHVybiB0aGUgb3JpZ2luYWwgZnVuY3Rpb24gaW4gY2FzZSBpdHMgYWNjZXNzZWQgZnJvbSB0aGUgcHJvdG90eXBlLlxuICAgIGlmIChoYXNPd25Qcm9wZXJ0eSh0aGlzLCAnY29uc3RydWN0b3InKSkgcmV0dXJuIGZuO1xuXG4gICAgLy8gQ3JlYXRlIG5ldyBtZXRob2Qgd2l0aCBjbGVhciBsb2dpYy5cbiAgICByZXR1cm4gZnVuY3Rpb24gY2xlYXJDYWNoZUxvZ2ljKHRoaXM6IG9iamVjdCwgLi4uYXJnczogYW55W10pOiBhbnkge1xuICAgICAgLy8gRXhlY3V0ZSB3aXRob3V0IGNsZWFyIGluIGNhc2UgdGhlIGNvbnRleHQgaXMgbmlsLlxuICAgICAgaWYgKGlzTmlsKHRoaXMpKSByZXR1cm4gZm4uYXBwbHkodGhpcywgYXJncyk7XG5cbiAgICAgIC8vIENsZWFyIHRoZSBjYWNoZSBiZWZvcmUgZXhlY3V0aW5nIHRoZSBmdW5jdGlvbi5cbiAgICAgIGlmIChjb25maWd1cmF0aW9uPy5iZWZvcmUpIEdsb2JhbC5jbGVhcih0aGlzKTtcblxuICAgICAgLy8gUmVzdWx0IG9mIHRoZSBmdW5jdGlvbi5cbiAgICAgIGNvbnN0IHJlc3VsdDogYW55ID0gZm4uYXBwbHkodGhpcywgYXJncyk7XG5cbiAgICAgIC8vIENsZWFyIHRoZSBjYWNoZSBhZnRlciBleGVjdXRpbmcgdGhlIGZ1bmN0aW9uLlxuICAgICAgaWYgKGNvbmZpZ3VyYXRpb24/LmFmdGVyIHx8ICFjb25maWd1cmF0aW9uPy5iZWZvcmUpIEdsb2JhbC5jbGVhcih0aGlzKTtcblxuICAgICAgLy8gUmV0dXJuIGZ1bmN0aW9uIHJlc3VsdC5cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbiAgfTtcblxuICAvLyBSZXR1cm4gbmV3IGRlc2NyaXB0b3Igd2l0aCBjbGVhciBsb2dpYy5cbiAgcmV0dXJuIG5ld0Rlc2NyaXB0b3I7XG59XG5cbi8qKlxuICogRGVjb3JhdGUgdGhlIGdldHRlciB0byBjbGVhciB0aGUgY2FjaGUgb24gZXhlY3V0aW9uLlxuICpcbiAqIEBwYXJhbSB0YXJnZXQgQ2xhc3MgKHByb3RvdHlwZSkuXG4gKiBAcGFyYW0gcHJvcGVydHkgUHJvcGVydHkgbmFtZS5cbiAqIEBwYXJhbSBkZXNjcmlwdG9yIFByb3BlcnR5IGRlc2NyaXB0b3IuXG4gKiBAcGFyYW0gY29uZmlndXJhdGlvbiBDb25maWd1cmF0aW9uLlxuICogQHJldHVybiBEZXNjcmlwdG9yIHdpdGggY2xlYXIgbG9naWMuXG4gKi9cbmZ1bmN0aW9uIGRlY29yYXRlR2V0dGVyKFxuICB0YXJnZXQ6IG9iamVjdCxcbiAgcHJvcGVydHk6IFByb3BlcnR5S2V5LFxuICBkZXNjcmlwdG9yOiBQcm9wZXJ0eURlc2NyaXB0b3IsXG4gIGNvbmZpZ3VyYXRpb24/OiBDbGVhckNvbmZpZ1xuKTogUHJvcGVydHlEZXNjcmlwdG9yIHtcbiAgLy8gQXR0cmlidXRlcyB1c2VkIHRvIGNyZWF0ZSBuZXcgYmVoYXZpb3VyLlxuICBjb25zdCB7IGdldCwgc2V0IH06IFByb3BlcnR5RGVzY3JpcHRvciA9IGRlc2NyaXB0b3I7XG5cbiAgLy8gTmV3IGRlc2NyaXB0b3Igd2l0aCBwcmVkZWZpbmVkIGNsZWFyIGxvZ2ljLlxuICBjb25zdCBuZXdEZXNjcmlwdG9yOiBQcm9wZXJ0eURlc2NyaXB0b3IgPSBwaWNrKGRlc2NyaXB0b3IsIFsnY29uZmlndXJhYmxlJywgJ2VudW1lcmFibGUnXSk7XG5cbiAgLy8gVXNlIHNldHRlciBmcm9tIGFuIGV4aXN0aW5nIGRlc2NyaXB0b3IuXG4gIG5ld0Rlc2NyaXB0b3Iuc2V0ID0gc2V0O1xuXG4gIC8vIENyZWF0ZSBuZXcgZ2V0dGVyIHdpdGggY2xlYXIgbG9naWMuXG4gIG5ld0Rlc2NyaXB0b3IuZ2V0ID0gZnVuY3Rpb24gZ2V0dGVyQ2xlYXJDYWNoZUxvZ2ljKHRoaXM6IG9iamVjdCk6IGFueSB7XG4gICAgLy8gRXhlY3V0ZSB3aXRob3V0IGNsZWFyIGluIGNhc2UgaXRzIGFjY2Vzc2VkIGZyb20gdGhlIHByb3RvdHlwZS5cbiAgICBpZiAoaGFzT3duUHJvcGVydHkodGhpcywgJ2NvbnN0cnVjdG9yJykpIHJldHVybiBnZXQuY2FsbCh0aGlzKTtcblxuICAgIC8vIENsZWFyIHRoZSBjYWNoZSBiZWZvcmUgZXhlY3V0aW5nIHRoZSBnZXR0ZXIuXG4gICAgaWYgKGNvbmZpZ3VyYXRpb24/LmJlZm9yZSkgR2xvYmFsLmNsZWFyKHRoaXMpO1xuXG4gICAgLy8gUmVzdWx0IG9mIHRoZSBnZXR0ZXIuXG4gICAgY29uc3QgcmVzdWx0OiBhbnkgPSBnZXQuY2FsbCh0aGlzKTtcblxuICAgIC8vIENsZWFyIHRoZSBjYWNoZSBhZnRlciBleGVjdXRpbmcgdGhlIGdldHRlci5cbiAgICBpZiAoY29uZmlndXJhdGlvbj8uYWZ0ZXIgfHwgIWNvbmZpZ3VyYXRpb24/LmJlZm9yZSkgR2xvYmFsLmNsZWFyKHRoaXMpO1xuXG4gICAgLy8gUmV0dXJuIGdldHRlciByZXN1bHQuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcblxuICAvLyBSZXR1cm4gbmV3IGRlc2NyaXB0b3Igd2l0aCBjbGVhciBsb2dpYy5cbiAgcmV0dXJuIG5ld0Rlc2NyaXB0b3I7XG59XG5cbi8qKlxuICogRGVjb3JhdGUgdGhlIHNldHRlciB0byBjbGVhciB0aGUgY2FjaGUgb24gZXhlY3V0aW9uLlxuICpcbiAqIEBwYXJhbSB0YXJnZXQgQ2xhc3MgKHByb3RvdHlwZSkuXG4gKiBAcGFyYW0gcHJvcGVydHkgUHJvcGVydHkgbmFtZS5cbiAqIEBwYXJhbSBkZXNjcmlwdG9yIFByb3BlcnR5IGRlc2NyaXB0b3IuXG4gKiBAcGFyYW0gY29uZmlndXJhdGlvbiBDb25maWd1cmF0aW9uLlxuICogQHJldHVybiBEZXNjcmlwdG9yIHdpdGggY2xlYXIgbG9naWMuXG4gKi9cbmZ1bmN0aW9uIGRlY29yYXRlU2V0dGVyKFxuICB0YXJnZXQ6IG9iamVjdCxcbiAgcHJvcGVydHk6IFByb3BlcnR5S2V5LFxuICBkZXNjcmlwdG9yOiBQcm9wZXJ0eURlc2NyaXB0b3IsXG4gIGNvbmZpZ3VyYXRpb24/OiBDbGVhckNvbmZpZ1xuKTogUHJvcGVydHlEZXNjcmlwdG9yIHtcbiAgLy8gQXR0cmlidXRlcyB1c2VkIHRvIGNyZWF0ZSBuZXcgYmVoYXZpb3VyLlxuICBjb25zdCB7IGdldCwgc2V0IH06IFByb3BlcnR5RGVzY3JpcHRvciA9IGRlc2NyaXB0b3I7XG5cbiAgLy8gTmV3IGRlc2NyaXB0b3Igd2l0aCBwcmVkZWZpbmVkIGNsZWFyIGxvZ2ljLlxuICBjb25zdCBuZXdEZXNjcmlwdG9yOiBQcm9wZXJ0eURlc2NyaXB0b3IgPSBwaWNrKGRlc2NyaXB0b3IsIFsnY29uZmlndXJhYmxlJywgJ2VudW1lcmFibGUnXSk7XG5cbiAgLy8gVXNlIGdldHRlciBmcm9tIGFuIGV4aXN0aW5nIGRlc2NyaXB0b3IuXG4gIG5ld0Rlc2NyaXB0b3IuZ2V0ID0gZ2V0O1xuXG4gIC8vIENyZWF0ZSBuZXcgc2V0dGVyIHdpdGggY2xlYXIgbG9naWMuXG4gIG5ld0Rlc2NyaXB0b3Iuc2V0ID0gZnVuY3Rpb24gc2V0dGVyQ2xlYXJDYWNoZUxvZ2ljKHRoaXM6IG9iamVjdCwgLi4uYXJnczogYW55W10pOiBhbnkge1xuICAgIC8vIEV4ZWN1dGUgd2l0aG91dCBjbGVhciBpbiBjYXNlIGl0cyBhY2Nlc3NlZCBmcm9tIHRoZSBwcm90b3R5cGUuXG4gICAgaWYgKGhhc093blByb3BlcnR5KHRoaXMsICdjb25zdHJ1Y3RvcicpKSByZXR1cm4gc2V0LmNhbGwodGhpcywgLi4uYXJncyk7XG5cbiAgICAvLyBDbGVhciB0aGUgY2FjaGUgYmVmb3JlIGV4ZWN1dGluZyB0aGUgc2V0dGVyLlxuICAgIGlmIChjb25maWd1cmF0aW9uPy5iZWZvcmUpIEdsb2JhbC5jbGVhcih0aGlzKTtcblxuICAgIC8vIEV4ZWN1dGUgdGhlIHNldHRlci5cbiAgICBzZXQuY2FsbCh0aGlzLCAuLi5hcmdzKTtcblxuICAgIC8vIENsZWFyIHRoZSBjYWNoZSBhZnRlciBleGVjdXRpbmcgdGhlIHNldHRlci5cbiAgICBpZiAoY29uZmlndXJhdGlvbj8uYWZ0ZXIgfHwgIWNvbmZpZ3VyYXRpb24/LmJlZm9yZSkgR2xvYmFsLmNsZWFyKHRoaXMpO1xuICB9O1xuXG4gIC8vIFJldHVybiBuZXcgZGVzY3JpcHRvciB3aXRoIGNsZWFyIGxvZ2ljLlxuICByZXR1cm4gbmV3RGVzY3JpcHRvcjtcbn1cblxuLyoqXG4gKiBVbml2ZXJzYWwgZGVjb3JhdG9yICh3aXRob3V0IHR5cGUgY2hlY2tpbmcpLlxuICovXG5mdW5jdGlvbiBkZWNvcmF0ZVVuaXZlcnNhbChhcmdzOiBhbnlbXSk6IGFueSB7XG4gIGlmIChhcmdzLmxlbmd0aCA8PSAxKVxuICAgIC8vIERlY29yYXRvciBpcyB1c2VkIGFzIHRoZSBmYWN0b3J5IG9yIGFwcGxpZWQgd2l0aCBjb25maWcuXG4gICAgcmV0dXJuICguLi5hcmdzMjogYW55W10pOiBhbnkgPT4gZGVjb3JhdGVVbml2ZXJzYWwoWy4uLmFyZ3MyLCAuLi5hcmdzXSk7XG5cbiAgLy8gRGVzdHJ1Y3R1cmluZyBvZiBkeW5hbWljIGFyZ3VtZW50cy5cbiAgY29uc3QgW3RhcmdldCwgcHJvcGVydHksIGRlc2NyaXB0b3IsIGNvbmZpZ3VyYXRpb25dID0gYXJncztcblxuICAvLyBWZXJpZnkgdGhhdCB0aGUgZGVjb3JhdG9yIGlzIHVzZWQgY29ycmVjdGx5LlxuICBpZiAoIWlzUGxhaW5PYmplY3QoZGVzY3JpcHRvcikpIHRocm93SW5jb3JyZWN0VXNhZ2UoKTtcblxuICAvLyBDcmVhdGUgbmV3IGRlY29yYXRvciBiYXNlZCBvbiB0aGUgcHJvcGVydHkgYW5kIGNvbmZpZ3VyYXRpb24uXG4gIGNvbnN0IG5ld2x5Q3JlYXRlZERlY29yYXRvcjogYW55ID1cbiAgICBpc0Z1bmN0aW9uKGRlc2NyaXB0b3IudmFsdWUpIHx8IGlzT3JpZ2luYWxseU1ldGhvZCh0YXJnZXQsIHByb3BlcnR5KVxuICAgICAgPyBtZXRob2RMZWdhY3lEZWNvcmF0b3IoZ2V0RGVjb3JhdG9ySWQoKSwgZGVjb3JhdGVNZXRob2QsIGNvbmZpZ3VyYXRpb24pXG4gICAgICA6IGlzRnVuY3Rpb24oZGVzY3JpcHRvci5nZXQpIHx8IGlzRnVuY3Rpb24oZGVzY3JpcHRvci5zZXQpXG4gICAgICA/IGNvbmZpZ3VyYXRpb24/LnNldHRlciB8fCAoZGVzY3JpcHRvci5zZXQgJiYgIWRlc2NyaXB0b3IuZ2V0KVxuICAgICAgICA/IGFjY2Vzc29yTGVnYWN5RGVjb3JhdG9yKGdldERlY29yYXRvcklkKCksIGRlY29yYXRlU2V0dGVyLCBjb25maWd1cmF0aW9uKVxuICAgICAgICA6IGFjY2Vzc29yTGVnYWN5RGVjb3JhdG9yKGdldERlY29yYXRvcklkKCksIGRlY29yYXRlR2V0dGVyLCBjb25maWd1cmF0aW9uKVxuICAgICAgOiB0aHJvd0luY29ycmVjdFVzYWdlKCk7XG5cbiAgLy8gRXhlY3V0ZSBuZXdseSBjcmVhdGVkIGRlY29yYXRvci5cbiAgcmV0dXJuIG5ld2x5Q3JlYXRlZERlY29yYXRvcih0YXJnZXQsIHByb3BlcnR5LCBkZXNjcmlwdG9yKTtcbn1cblxuLyoqXG4gKiBDbGVhciB0aGUgY2FjaGVkIHJlc3VsdHMgb2YgdGhlIG1ldGhvZCBvciBnZXR0ZXIuXG4gKlxuICogQHBhcmFtIGNvbmZpZyBDb25maWd1cmF0aW9uLlxuICogQHJldHVybiBNZXRob2Qgb3IgYWNjZXNzb3IgZGVjb3JhdG9yLlxuICovXG5leHBvcnQgZnVuY3Rpb24gQ2FjaGVDbGVhcihjb25maWc/OiBDbGVhckNvbmZpZyk6IE1ldGhvZERlY29yYXRvcjtcblxuLyoqXG4gKiBDbGVhciB0aGUgY2FjaGVkIHJlc3VsdHMgb2YgdGhlIG1ldGhvZCBvciBnZXR0ZXIuXG4gKlxuICogQHBhcmFtIHRhcmdldCBDbGFzcyAocHJvdG90eXBlKS5cbiAqIEBwYXJhbSBwcm9wZXJ0eSBQcm9wZXJ0eSBuYW1lLlxuICogQHBhcmFtIGRlc2NyaXB0b3IgUHJvcGVydHkgRGVzY3JpcHRvci5cbiAqIEByZXR1cm4gRGVzY3JpcHRvciB3aXRoIGNsZWFyIGxvZ2ljLlxuICovXG5leHBvcnQgZnVuY3Rpb24gQ2FjaGVDbGVhcih0YXJnZXQ6IG9iamVjdCwgcHJvcGVydHk6IFByb3BlcnR5S2V5LCBkZXNjcmlwdG9yOiBQcm9wZXJ0eURlc2NyaXB0b3IpOiBQcm9wZXJ0eURlc2NyaXB0b3I7XG5leHBvcnQgZnVuY3Rpb24gQ2FjaGVDbGVhciguLi5hcmdzOiBhbnlbXSk6IGFueSB7XG4gIHJldHVybiBkZWNvcmF0ZVVuaXZlcnNhbC5jYWxsKG51bGwsIGFyZ3MpO1xufVxuXG4vKipcbiAqIENsZWFyIHRoZSBjYWNoZWQgcmVzdWx0cyBvZiB0aGUgbWV0aG9kIG9yIGdldHRlci5cbiAqXG4gKiBAcGFyYW0gY29uZmlnIENvbmZpZ3VyYXRpb24uXG4gKiBAcmV0dXJuIE1ldGhvZCBvciBhY2Nlc3NvciBkZWNvcmF0b3IuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjYWNoZUNsZWFyKGNvbmZpZz86IENsZWFyQ29uZmlnKTogTWV0aG9kRGVjb3JhdG9yO1xuXG4vKipcbiAqIENsZWFyIHRoZSBjYWNoZWQgcmVzdWx0cyBvZiB0aGUgbWV0aG9kIG9yIGdldHRlci5cbiAqXG4gKiBAcGFyYW0gdGFyZ2V0IENsYXNzIChwcm90b3R5cGUpLlxuICogQHBhcmFtIHByb3BlcnR5IFByb3BlcnR5IG5hbWUuXG4gKiBAcGFyYW0gZGVzY3JpcHRvciBQcm9wZXJ0eSBEZXNjcmlwdG9yLlxuICogQHJldHVybiBEZXNjcmlwdG9yIHdpdGggY2xlYXIgbG9naWMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjYWNoZUNsZWFyKHRhcmdldDogb2JqZWN0LCBwcm9wZXJ0eTogUHJvcGVydHlLZXksIGRlc2NyaXB0b3I6IFByb3BlcnR5RGVzY3JpcHRvcik6IFByb3BlcnR5RGVzY3JpcHRvcjtcbmV4cG9ydCBmdW5jdGlvbiBjYWNoZUNsZWFyKC4uLmFyZ3M6IGFueVtdKTogYW55IHtcbiAgcmV0dXJuIGRlY29yYXRlVW5pdmVyc2FsLmNhbGwobnVsbCwgYXJncyk7XG59XG4iXX0=