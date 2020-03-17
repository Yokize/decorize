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
var cache_1 = require("../cache");
var global_1 = require("../global");
/**
 * Decorate the method to cache its result.
 *
 * @param target Class (prototype).
 * @param property Method name.
 * @param descriptor Method descriptor.
 * @param configuration Configuration.
 * @return Descriptor with cache logic.
 */
function decorateMethod(target, property, descriptor, configuration) {
    // Attributes used to create new behaviour.
    var get = descriptor.get, set = descriptor.set, value = descriptor.value;
    // New descriptor with predefined cache logic.
    var newDescriptor = pick_1.default(descriptor, ['configurable', 'enumerable']);
    // Create new setter or use from an existing descriptor.
    newDescriptor.set = isFunction_1.default(get) || isFunction_1.default(set) ? set : createSetter_1.createSetter(property);
    // Create new getter which generate function with cache logic.
    newDescriptor.get = function cacheGetter() {
        var _a;
        // Function whose result has to be cached.
        var fn = (_a = get === null || get === void 0 ? void 0 : get.call(this)) !== null && _a !== void 0 ? _a : value;
        // Verify that the function is the correct type.
        if (!isFunction_1.default(fn))
            cache_1.throwIncorrectUsage();
        // Return the original function in case its accessed from the prototype.
        if (hasOwnProperty_1.hasOwnProperty(this, 'constructor'))
            return fn;
        // Create new method with cache logic.
        return function cacheLogic() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var _a;
            // Execute without cache in case the context is nil.
            if (isNil_1.default(this))
                return fn.apply(this, args);
            // Generate the key which used to store and access the result.
            var cacheKey = ((_a = configuration === null || configuration === void 0 ? void 0 : configuration.resolver) !== null && _a !== void 0 ? _a : global_1.Global.resolver).apply(void 0, args);
            // Need to check cache expiration.
            cache_1.checkExpiration(this, property, cacheKey, configuration);
            // Determine whether the result is already in the cache.
            if (!global_1.Global.has(this, property, cacheKey)) {
                // Cache entry with the result.
                var cacheEntry = {
                    value: fn.apply(this, args),
                    maxAge: configuration === null || configuration === void 0 ? void 0 : configuration.maxAge,
                    timestamp: Date.now()
                };
                //  Cache the result of the method.
                global_1.Global.set(this, property, cacheKey, cacheEntry);
            }
            // Retrieve the cached result.
            return global_1.Global.get(this, property, cacheKey).value;
        };
    };
    // Return new descriptor with cache logic.
    return newDescriptor;
}
/**
 * Decorate the getter to cache its result.
 *
 * @param target Class (prototype).
 * @param property Property name.
 * @param descriptor Property descriptor.
 * @param configuration Configuration.
 * @return Descriptor with cache logic.
 */
function decorateGetter(target, property, descriptor, configuration) {
    // Attributes used to create new behaviour.
    var get = descriptor.get, set = descriptor.set;
    // New descriptor with predefined cache logic.
    var newDescriptor = pick_1.default(descriptor, ['configurable', 'enumerable']);
    // Use setter from an existing descriptor.
    newDescriptor.set = set;
    // Create new getter to cache its result.
    newDescriptor.get = function cacheLogic() {
        var _a;
        // Execute without cache in case its accessed from the prototype.
        if (hasOwnProperty_1.hasOwnProperty(this, 'constructor'))
            return get.call(this);
        // Generate the key which used to store and access the result.
        var cacheKey = ((_a = configuration === null || configuration === void 0 ? void 0 : configuration.resolver) !== null && _a !== void 0 ? _a : global_1.Global.resolver)();
        // Need to check cache expiration.
        cache_1.checkExpiration(this, property, cacheKey, configuration);
        // Determine whether the result is already in the cache.
        if (!global_1.Global.has(this, property, cacheKey)) {
            // Cache entry with the result.
            var cacheEntry = {
                value: get.call(this),
                maxAge: configuration === null || configuration === void 0 ? void 0 : configuration.maxAge,
                timestamp: Date.now()
            };
            // Cache the result of the getter.
            global_1.Global.set(this, property, cacheKey, cacheEntry);
        }
        // Retrieve the cached result.
        return global_1.Global.get(this, property, cacheKey).value;
    };
    // Return new descriptor with cache logic.
    return newDescriptor;
}
/**
 * Universal decorator (without type checking).
 */
function decorateUniversal(args) {
    if (args.length === 0)
        // Decorator is used as the factory.
        return function () {
            var args2 = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args2[_i] = arguments[_i];
            }
            return decorateUniversal(args2);
        };
    if (args.length === 1)
        // Decorator is applied with config.
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
        cache_1.throwIncorrectUsage();
    // Create new decorator based on the property (method / getter).
    var newlyCreatedDecorator = isFunction_1.default(descriptor.value) || isOriginallyMethod_1.isOriginallyMethod(target, property)
        ? methodLegacyDecorator_1.methodLegacyDecorator(cache_1.getDecoratorId(), decorateMethod, configuration)
        : isFunction_1.default(descriptor.get)
            ? accessorLegacyDecorator_1.accessorLegacyDecorator(cache_1.getDecoratorId(), decorateGetter, configuration)
            : cache_1.throwIncorrectUsage();
    // Execute newly created decorator.
    return newlyCreatedDecorator(target, property, descriptor);
}
function Cache() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return decorateUniversal.call(null, args);
}
exports.Cache = Cache;
function cache() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return decorateUniversal.call(null, args);
}
exports.cache = cache;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FjaGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvbGVnYWN5L2NhY2hlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHFEQUErQjtBQUMvQix1REFBaUM7QUFDakMsaUVBQTJDO0FBQzNDLHVFQUFpRDtBQUNqRCxxRUFBb0U7QUFDcEUsd0VBQXVFO0FBQ3ZFLGlGQUFnRjtBQUNoRixxRkFBb0Y7QUFDcEYseUZBQXdGO0FBQ3hGLGtDQUF5RztBQUN6RyxvQ0FBbUM7QUFFbkM7Ozs7Ozs7O0dBUUc7QUFDSCxTQUFTLGNBQWMsQ0FDckIsTUFBYyxFQUNkLFFBQXFCLEVBQ3JCLFVBQThCLEVBQzlCLGFBQTJCO0lBRTNCLDJDQUEyQztJQUNuQyxJQUFBLG9CQUFHLEVBQUUsb0JBQUcsRUFBRSx3QkFBSyxDQUFvQztJQUUzRCw4Q0FBOEM7SUFDOUMsSUFBTSxhQUFhLEdBQXVCLGNBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxjQUFjLEVBQUUsWUFBWSxDQUFDLENBQUMsQ0FBQztJQUUzRix3REFBd0Q7SUFDeEQsYUFBYSxDQUFDLEdBQUcsR0FBRyxvQkFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLG9CQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsMkJBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUV0Riw4REFBOEQ7SUFDOUQsYUFBYSxDQUFDLEdBQUcsR0FBRyxTQUFTLFdBQVc7O1FBQ3RDLDBDQUEwQztRQUMxQyxJQUFNLEVBQUUsU0FBYSxHQUFHLGFBQUgsR0FBRyx1QkFBSCxHQUFHLENBQUUsSUFBSSxDQUFDLElBQUksb0NBQUssS0FBSyxDQUFDO1FBRTlDLGdEQUFnRDtRQUNoRCxJQUFJLENBQUMsb0JBQVUsQ0FBQyxFQUFFLENBQUM7WUFBRSwyQkFBbUIsRUFBRSxDQUFDO1FBRTNDLHdFQUF3RTtRQUN4RSxJQUFJLCtCQUFjLENBQUMsSUFBSSxFQUFF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Q0FBQyxzQkFBYyxFQUFFLEVBQUUsY0FBYyxFQUFFLGFBQWEsQ0FBQztRQUN4RSxDQUFDLENBQUMsb0JBQVUsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDO1lBQzVCLENBQUMsQ0FBQyxpREFBdUIsQ0FBQyxzQkFBYyxFQUFFLEVBQUUsY0FBYyxFQUFFLGFBQWEsQ0FBQztZQUMxRSxDQUFDLENBQUMsMkJBQW1CLEVBQUUsQ0FBQztJQUU1QixtQ0FBbUM7SUFDbkMsT0FBTyxxQkFBcUIsQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0FBQzdELENBQUM7QUFtQkQsU0FBZ0IsS0FBSztJQUFDLGNBQWM7U0FBZCxVQUFjLEVBQWQscUJBQWMsRUFBZCxJQUFjO1FBQWQseUJBQWM7O0lBQ2xDLE9BQU8saUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztBQUM1QyxDQUFDO0FBRkQsc0JBRUM7QUFtQkQsU0FBZ0IsS0FBSztJQUFDLGNBQWM7U0FBZCxVQUFjLEVBQWQscUJBQWMsRUFBZCxJQUFjO1FBQWQseUJBQWM7O0lBQ2xDLE9BQU8saUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztBQUM1QyxDQUFDO0FBRkQsc0JBRUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcGljayBmcm9tICdsb2Rhc2gvcGljayc7XG5pbXBvcnQgaXNOaWwgZnJvbSAnbG9kYXNoL2lzTmlsJztcbmltcG9ydCBpc0Z1bmN0aW9uIGZyb20gJ2xvZGFzaC9pc0Z1bmN0aW9uJztcbmltcG9ydCBpc1BsYWluT2JqZWN0IGZyb20gJ2xvZGFzaC9pc1BsYWluT2JqZWN0JztcbmltcG9ydCB7IGNyZWF0ZVNldHRlciB9IGZyb20gJ0BkZWNvcml6ZS9jb3JlL2FjY2Vzc29yL2NyZWF0ZVNldHRlcic7XG5pbXBvcnQgeyBoYXNPd25Qcm9wZXJ0eSB9IGZyb20gJ0BkZWNvcml6ZS9jb3JlL3JlZmxlY3QvaGFzT3duUHJvcGVydHknO1xuaW1wb3J0IHsgaXNPcmlnaW5hbGx5TWV0aG9kIH0gZnJvbSAnQGRlY29yaXplL2NvcmUvb3JpZ2luYWwvaXNPcmlnaW5hbGx5TWV0aG9kJztcbmltcG9ydCB7IG1ldGhvZExlZ2FjeURlY29yYXRvciB9IGZyb20gJ0BkZWNvcml6ZS9jb3JlL2xlZ2FjeS9tZXRob2RMZWdhY3lEZWNvcmF0b3InO1xuaW1wb3J0IHsgYWNjZXNzb3JMZWdhY3lEZWNvcmF0b3IgfSBmcm9tICdAZGVjb3JpemUvY29yZS9sZWdhY3kvYWNjZXNzb3JMZWdhY3lEZWNvcmF0b3InO1xuaW1wb3J0IHsgZ2V0RGVjb3JhdG9ySWQsIENhY2hlQ29uZmlnLCBDYWNoZUVudHJ5LCBjaGVja0V4cGlyYXRpb24sIHRocm93SW5jb3JyZWN0VXNhZ2UgfSBmcm9tICcuLi9jYWNoZSc7XG5pbXBvcnQgeyBHbG9iYWwgfSBmcm9tICcuLi9nbG9iYWwnO1xuXG4vKipcbiAqIERlY29yYXRlIHRoZSBtZXRob2QgdG8gY2FjaGUgaXRzIHJlc3VsdC5cbiAqXG4gKiBAcGFyYW0gdGFyZ2V0IENsYXNzIChwcm90b3R5cGUpLlxuICogQHBhcmFtIHByb3BlcnR5IE1ldGhvZCBuYW1lLlxuICogQHBhcmFtIGRlc2NyaXB0b3IgTWV0aG9kIGRlc2NyaXB0b3IuXG4gKiBAcGFyYW0gY29uZmlndXJhdGlvbiBDb25maWd1cmF0aW9uLlxuICogQHJldHVybiBEZXNjcmlwdG9yIHdpdGggY2FjaGUgbG9naWMuXG4gKi9cbmZ1bmN0aW9uIGRlY29yYXRlTWV0aG9kKFxuICB0YXJnZXQ6IG9iamVjdCxcbiAgcHJvcGVydHk6IFByb3BlcnR5S2V5LFxuICBkZXNjcmlwdG9yOiBQcm9wZXJ0eURlc2NyaXB0b3IsXG4gIGNvbmZpZ3VyYXRpb24/OiBDYWNoZUNvbmZpZ1xuKTogUHJvcGVydHlEZXNjcmlwdG9yIHtcbiAgLy8gQXR0cmlidXRlcyB1c2VkIHRvIGNyZWF0ZSBuZXcgYmVoYXZpb3VyLlxuICBjb25zdCB7IGdldCwgc2V0LCB2YWx1ZSB9OiBQcm9wZXJ0eURlc2NyaXB0b3IgPSBkZXNjcmlwdG9yO1xuXG4gIC8vIE5ldyBkZXNjcmlwdG9yIHdpdGggcHJlZGVmaW5lZCBjYWNoZSBsb2dpYy5cbiAgY29uc3QgbmV3RGVzY3JpcHRvcjogUHJvcGVydHlEZXNjcmlwdG9yID0gcGljayhkZXNjcmlwdG9yLCBbJ2NvbmZpZ3VyYWJsZScsICdlbnVtZXJhYmxlJ10pO1xuXG4gIC8vIENyZWF0ZSBuZXcgc2V0dGVyIG9yIHVzZSBmcm9tIGFuIGV4aXN0aW5nIGRlc2NyaXB0b3IuXG4gIG5ld0Rlc2NyaXB0b3Iuc2V0ID0gaXNGdW5jdGlvbihnZXQpIHx8IGlzRnVuY3Rpb24oc2V0KSA/IHNldCA6IGNyZWF0ZVNldHRlcihwcm9wZXJ0eSk7XG5cbiAgLy8gQ3JlYXRlIG5ldyBnZXR0ZXIgd2hpY2ggZ2VuZXJhdGUgZnVuY3Rpb24gd2l0aCBjYWNoZSBsb2dpYy5cbiAgbmV3RGVzY3JpcHRvci5nZXQgPSBmdW5jdGlvbiBjYWNoZUdldHRlcih0aGlzOiBvYmplY3QpOiBGdW5jdGlvbiB7XG4gICAgLy8gRnVuY3Rpb24gd2hvc2UgcmVzdWx0IGhhcyB0byBiZSBjYWNoZWQuXG4gICAgY29uc3QgZm46IEZ1bmN0aW9uID0gZ2V0Py5jYWxsKHRoaXMpID8/IHZhbHVlO1xuXG4gICAgLy8gVmVyaWZ5IHRoYXQgdGhlIGZ1bmN0aW9uIGlzIHRoZSBjb3JyZWN0IHR5cGUuXG4gICAgaWYgKCFpc0Z1bmN0aW9uKGZuKSkgdGhyb3dJbmNvcnJlY3RVc2FnZSgpO1xuXG4gICAgLy8gUmV0dXJuIHRoZSBvcmlnaW5hbCBmdW5jdGlvbiBpbiBjYXNlIGl0cyBhY2Nlc3NlZCBmcm9tIHRoZSBwcm90b3R5cGUuXG4gICAgaWYgKGhhc093blByb3BlcnR5KHRoaXMsICdjb25zdHJ1Y3RvcicpKSByZXR1cm4gZm47XG5cbiAgICAvLyBDcmVhdGUgbmV3IG1ldGhvZCB3aXRoIGNhY2hlIGxvZ2ljLlxuICAgIHJldHVybiBmdW5jdGlvbiBjYWNoZUxvZ2ljKHRoaXM6IG9iamVjdCwgLi4uYXJnczogYW55W10pOiBhbnkge1xuICAgICAgLy8gRXhlY3V0ZSB3aXRob3V0IGNhY2hlIGluIGNhc2UgdGhlIGNvbnRleHQgaXMgbmlsLlxuICAgICAgaWYgKGlzTmlsKHRoaXMpKSByZXR1cm4gZm4uYXBwbHkodGhpcywgYXJncyk7XG5cbiAgICAgIC8vIEdlbmVyYXRlIHRoZSBrZXkgd2hpY2ggdXNlZCB0byBzdG9yZSBhbmQgYWNjZXNzIHRoZSByZXN1bHQuXG4gICAgICBjb25zdCBjYWNoZUtleTogUHJvcGVydHlLZXkgPSAoY29uZmlndXJhdGlvbj8ucmVzb2x2ZXIgPz8gR2xvYmFsLnJlc29sdmVyKSguLi5hcmdzKTtcblxuICAgICAgLy8gTmVlZCB0byBjaGVjayBjYWNoZSBleHBpcmF0aW9uLlxuICAgICAgY2hlY2tFeHBpcmF0aW9uKHRoaXMsIHByb3BlcnR5LCBjYWNoZUtleSwgY29uZmlndXJhdGlvbik7XG5cbiAgICAgIC8vIERldGVybWluZSB3aGV0aGVyIHRoZSByZXN1bHQgaXMgYWxyZWFkeSBpbiB0aGUgY2FjaGUuXG4gICAgICBpZiAoIUdsb2JhbC5oYXModGhpcywgcHJvcGVydHksIGNhY2hlS2V5KSkge1xuICAgICAgICAvLyBDYWNoZSBlbnRyeSB3aXRoIHRoZSByZXN1bHQuXG4gICAgICAgIGNvbnN0IGNhY2hlRW50cnk6IENhY2hlRW50cnkgPSB7XG4gICAgICAgICAgdmFsdWU6IGZuLmFwcGx5KHRoaXMsIGFyZ3MpLFxuICAgICAgICAgIG1heEFnZTogY29uZmlndXJhdGlvbj8ubWF4QWdlLFxuICAgICAgICAgIHRpbWVzdGFtcDogRGF0ZS5ub3coKVxuICAgICAgICB9O1xuXG4gICAgICAgIC8vICBDYWNoZSB0aGUgcmVzdWx0IG9mIHRoZSBtZXRob2QuXG4gICAgICAgIEdsb2JhbC5zZXQodGhpcywgcHJvcGVydHksIGNhY2hlS2V5LCBjYWNoZUVudHJ5KTtcbiAgICAgIH1cblxuICAgICAgLy8gUmV0cmlldmUgdGhlIGNhY2hlZCByZXN1bHQuXG4gICAgICByZXR1cm4gR2xvYmFsLmdldCh0aGlzLCBwcm9wZXJ0eSwgY2FjaGVLZXkpLnZhbHVlO1xuICAgIH07XG4gIH07XG5cbiAgLy8gUmV0dXJuIG5ldyBkZXNjcmlwdG9yIHdpdGggY2FjaGUgbG9naWMuXG4gIHJldHVybiBuZXdEZXNjcmlwdG9yO1xufVxuXG4vKipcbiAqIERlY29yYXRlIHRoZSBnZXR0ZXIgdG8gY2FjaGUgaXRzIHJlc3VsdC5cbiAqXG4gKiBAcGFyYW0gdGFyZ2V0IENsYXNzIChwcm90b3R5cGUpLlxuICogQHBhcmFtIHByb3BlcnR5IFByb3BlcnR5IG5hbWUuXG4gKiBAcGFyYW0gZGVzY3JpcHRvciBQcm9wZXJ0eSBkZXNjcmlwdG9yLlxuICogQHBhcmFtIGNvbmZpZ3VyYXRpb24gQ29uZmlndXJhdGlvbi5cbiAqIEByZXR1cm4gRGVzY3JpcHRvciB3aXRoIGNhY2hlIGxvZ2ljLlxuICovXG5mdW5jdGlvbiBkZWNvcmF0ZUdldHRlcihcbiAgdGFyZ2V0OiBvYmplY3QsXG4gIHByb3BlcnR5OiBQcm9wZXJ0eUtleSxcbiAgZGVzY3JpcHRvcjogUHJvcGVydHlEZXNjcmlwdG9yLFxuICBjb25maWd1cmF0aW9uPzogQ2FjaGVDb25maWdcbik6IFByb3BlcnR5RGVzY3JpcHRvciB7XG4gIC8vIEF0dHJpYnV0ZXMgdXNlZCB0byBjcmVhdGUgbmV3IGJlaGF2aW91ci5cbiAgY29uc3QgeyBnZXQsIHNldCB9OiBQcm9wZXJ0eURlc2NyaXB0b3IgPSBkZXNjcmlwdG9yO1xuXG4gIC8vIE5ldyBkZXNjcmlwdG9yIHdpdGggcHJlZGVmaW5lZCBjYWNoZSBsb2dpYy5cbiAgY29uc3QgbmV3RGVzY3JpcHRvcjogUHJvcGVydHlEZXNjcmlwdG9yID0gcGljayhkZXNjcmlwdG9yLCBbJ2NvbmZpZ3VyYWJsZScsICdlbnVtZXJhYmxlJ10pO1xuXG4gIC8vIFVzZSBzZXR0ZXIgZnJvbSBhbiBleGlzdGluZyBkZXNjcmlwdG9yLlxuICBuZXdEZXNjcmlwdG9yLnNldCA9IHNldDtcblxuICAvLyBDcmVhdGUgbmV3IGdldHRlciB0byBjYWNoZSBpdHMgcmVzdWx0LlxuICBuZXdEZXNjcmlwdG9yLmdldCA9IGZ1bmN0aW9uIGNhY2hlTG9naWModGhpczogb2JqZWN0KTogYW55IHtcbiAgICAvLyBFeGVjdXRlIHdpdGhvdXQgY2FjaGUgaW4gY2FzZSBpdHMgYWNjZXNzZWQgZnJvbSB0aGUgcHJvdG90eXBlLlxuICAgIGlmIChoYXNPd25Qcm9wZXJ0eSh0aGlzLCAnY29uc3RydWN0b3InKSkgcmV0dXJuIGdldC5jYWxsKHRoaXMpO1xuXG4gICAgLy8gR2VuZXJhdGUgdGhlIGtleSB3aGljaCB1c2VkIHRvIHN0b3JlIGFuZCBhY2Nlc3MgdGhlIHJlc3VsdC5cbiAgICBjb25zdCBjYWNoZUtleTogUHJvcGVydHlLZXkgPSAoY29uZmlndXJhdGlvbj8ucmVzb2x2ZXIgPz8gR2xvYmFsLnJlc29sdmVyKSgpO1xuXG4gICAgLy8gTmVlZCB0byBjaGVjayBjYWNoZSBleHBpcmF0aW9uLlxuICAgIGNoZWNrRXhwaXJhdGlvbih0aGlzLCBwcm9wZXJ0eSwgY2FjaGVLZXksIGNvbmZpZ3VyYXRpb24pO1xuXG4gICAgLy8gRGV0ZXJtaW5lIHdoZXRoZXIgdGhlIHJlc3VsdCBpcyBhbHJlYWR5IGluIHRoZSBjYWNoZS5cbiAgICBpZiAoIUdsb2JhbC5oYXModGhpcywgcHJvcGVydHksIGNhY2hlS2V5KSkge1xuICAgICAgLy8gQ2FjaGUgZW50cnkgd2l0aCB0aGUgcmVzdWx0LlxuICAgICAgY29uc3QgY2FjaGVFbnRyeTogQ2FjaGVFbnRyeSA9IHtcbiAgICAgICAgdmFsdWU6IGdldC5jYWxsKHRoaXMpLFxuICAgICAgICBtYXhBZ2U6IGNvbmZpZ3VyYXRpb24/Lm1heEFnZSxcbiAgICAgICAgdGltZXN0YW1wOiBEYXRlLm5vdygpXG4gICAgICB9O1xuXG4gICAgICAvLyBDYWNoZSB0aGUgcmVzdWx0IG9mIHRoZSBnZXR0ZXIuXG4gICAgICBHbG9iYWwuc2V0KHRoaXMsIHByb3BlcnR5LCBjYWNoZUtleSwgY2FjaGVFbnRyeSk7XG4gICAgfVxuXG4gICAgLy8gUmV0cmlldmUgdGhlIGNhY2hlZCByZXN1bHQuXG4gICAgcmV0dXJuIEdsb2JhbC5nZXQodGhpcywgcHJvcGVydHksIGNhY2hlS2V5KS52YWx1ZTtcbiAgfTtcblxuICAvLyBSZXR1cm4gbmV3IGRlc2NyaXB0b3Igd2l0aCBjYWNoZSBsb2dpYy5cbiAgcmV0dXJuIG5ld0Rlc2NyaXB0b3I7XG59XG5cbi8qKlxuICogVW5pdmVyc2FsIGRlY29yYXRvciAod2l0aG91dCB0eXBlIGNoZWNraW5nKS5cbiAqL1xuZnVuY3Rpb24gZGVjb3JhdGVVbml2ZXJzYWwoYXJnczogYW55W10pOiBhbnkge1xuICBpZiAoYXJncy5sZW5ndGggPT09IDApXG4gICAgLy8gRGVjb3JhdG9yIGlzIHVzZWQgYXMgdGhlIGZhY3RvcnkuXG4gICAgcmV0dXJuICguLi5hcmdzMjogYW55W10pOiBhbnkgPT4gZGVjb3JhdGVVbml2ZXJzYWwoYXJnczIpO1xuXG4gIGlmIChhcmdzLmxlbmd0aCA9PT0gMSlcbiAgICAvLyBEZWNvcmF0b3IgaXMgYXBwbGllZCB3aXRoIGNvbmZpZy5cbiAgICByZXR1cm4gKC4uLmFyZ3MyOiBhbnlbXSk6IGFueSA9PiBkZWNvcmF0ZVVuaXZlcnNhbChbLi4uYXJnczIsIC4uLmFyZ3NdKTtcblxuICAvLyBEZXN0cnVjdHVyaW5nIG9mIGR5bmFtaWMgYXJndW1lbnRzLlxuICBjb25zdCBbdGFyZ2V0LCBwcm9wZXJ0eSwgZGVzY3JpcHRvciwgY29uZmlndXJhdGlvbl0gPSBhcmdzO1xuXG4gIC8vIFZlcmlmeSB0aGF0IHRoZSBkZWNvcmF0b3IgaXMgdXNlZCBjb3JyZWN0bHkuXG4gIGlmICghaXNQbGFpbk9iamVjdChkZXNjcmlwdG9yKSkgdGhyb3dJbmNvcnJlY3RVc2FnZSgpO1xuXG4gIC8vIENyZWF0ZSBuZXcgZGVjb3JhdG9yIGJhc2VkIG9uIHRoZSBwcm9wZXJ0eSAobWV0aG9kIC8gZ2V0dGVyKS5cbiAgY29uc3QgbmV3bHlDcmVhdGVkRGVjb3JhdG9yOiBhbnkgPVxuICAgIGlzRnVuY3Rpb24oZGVzY3JpcHRvci52YWx1ZSkgfHwgaXNPcmlnaW5hbGx5TWV0aG9kKHRhcmdldCwgcHJvcGVydHkpXG4gICAgICA/IG1ldGhvZExlZ2FjeURlY29yYXRvcihnZXREZWNvcmF0b3JJZCgpLCBkZWNvcmF0ZU1ldGhvZCwgY29uZmlndXJhdGlvbilcbiAgICAgIDogaXNGdW5jdGlvbihkZXNjcmlwdG9yLmdldClcbiAgICAgID8gYWNjZXNzb3JMZWdhY3lEZWNvcmF0b3IoZ2V0RGVjb3JhdG9ySWQoKSwgZGVjb3JhdGVHZXR0ZXIsIGNvbmZpZ3VyYXRpb24pXG4gICAgICA6IHRocm93SW5jb3JyZWN0VXNhZ2UoKTtcblxuICAvLyBFeGVjdXRlIG5ld2x5IGNyZWF0ZWQgZGVjb3JhdG9yLlxuICByZXR1cm4gbmV3bHlDcmVhdGVkRGVjb3JhdG9yKHRhcmdldCwgcHJvcGVydHksIGRlc2NyaXB0b3IpO1xufVxuXG4vKipcbiAqIENhY2hlIHRoZSByZXN1bHQgb2YgdGhlIG1ldGhvZCBvciBnZXR0ZXIuXG4gKlxuICogQHBhcmFtIGNvbmZpZyBDb25maWd1cmF0aW9uLlxuICogQHJldHVybiBNZXRob2Qgb3IgZ2V0dGVyIGRlY29yYXRvci5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIENhY2hlKGNvbmZpZz86IENhY2hlQ29uZmlnKTogTWV0aG9kRGVjb3JhdG9yO1xuXG4vKipcbiAqIENhY2hlIHRoZSByZXN1bHQgb2YgdGhlIG1ldGhvZCBvciBnZXR0ZXIuXG4gKlxuICogQHBhcmFtIHRhcmdldCBDbGFzcyAocHJvdG90eXBlKS5cbiAqIEBwYXJhbSBwcm9wZXJ0eSBQcm9wZXJ0eSBuYW1lLlxuICogQHBhcmFtIGRlc2NyaXB0b3IgUHJvcGVydHkgRGVzY3JpcHRvci5cbiAqIEByZXR1cm4gRGVzY3JpcHRvciB3aXRoIGNhY2hlIGxvZ2ljLlxuICovXG5leHBvcnQgZnVuY3Rpb24gQ2FjaGUodGFyZ2V0OiBvYmplY3QsIHByb3BlcnR5OiBQcm9wZXJ0eUtleSwgZGVzY3JpcHRvcjogUHJvcGVydHlEZXNjcmlwdG9yKTogUHJvcGVydHlEZXNjcmlwdG9yO1xuZXhwb3J0IGZ1bmN0aW9uIENhY2hlKC4uLmFyZ3M6IGFueVtdKTogYW55IHtcbiAgcmV0dXJuIGRlY29yYXRlVW5pdmVyc2FsLmNhbGwobnVsbCwgYXJncyk7XG59XG5cbi8qKlxuICogQ2FjaGUgdGhlIHJlc3VsdCBvZiB0aGUgbWV0aG9kIG9yIGdldHRlci5cbiAqXG4gKiBAcGFyYW0gY29uZmlnIENvbmZpZ3VyYXRpb24uXG4gKiBAcmV0dXJuIE1ldGhvZCBvciBnZXR0ZXIgZGVjb3JhdG9yLlxuICovXG5leHBvcnQgZnVuY3Rpb24gY2FjaGUoY29uZmlnPzogQ2FjaGVDb25maWcpOiBNZXRob2REZWNvcmF0b3I7XG5cbi8qKlxuICogQ2FjaGUgdGhlIHJlc3VsdCBvZiB0aGUgbWV0aG9kIG9yIGdldHRlci5cbiAqXG4gKiBAcGFyYW0gdGFyZ2V0IENsYXNzIChwcm90b3R5cGUpLlxuICogQHBhcmFtIHByb3BlcnR5IFByb3BlcnR5IG5hbWUuXG4gKiBAcGFyYW0gZGVzY3JpcHRvciBQcm9wZXJ0eSBEZXNjcmlwdG9yLlxuICogQHJldHVybiBEZXNjcmlwdG9yIHdpdGggY2FjaGUgbG9naWMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjYWNoZSh0YXJnZXQ6IG9iamVjdCwgcHJvcGVydHk6IFByb3BlcnR5S2V5LCBkZXNjcmlwdG9yOiBQcm9wZXJ0eURlc2NyaXB0b3IpOiBQcm9wZXJ0eURlc2NyaXB0b3I7XG5leHBvcnQgZnVuY3Rpb24gY2FjaGUoLi4uYXJnczogYW55W10pOiBhbnkge1xuICByZXR1cm4gZGVjb3JhdGVVbml2ZXJzYWwuY2FsbChudWxsLCBhcmdzKTtcbn1cbiJdfQ==